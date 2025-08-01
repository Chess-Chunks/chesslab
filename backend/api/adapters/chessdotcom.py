from typing import Optional, List
from datetime import date, datetime, timedelta
import re
import httpx
from fastapi import HTTPException

from api.models.insights import ResultSummary, RatingInsight
from api.adapters.base import BaseImportAdapter
from api.enums import SpeedType

from chessdotcom.endpoints.player_stats import get_player_stats


class ChessDotComAdapter(BaseImportAdapter):
    """Adapter for fetching insights from Chess.com via HTTP API."""

    @property
    def BASE_URL(self) -> str:
        return "https://api.chess.com/pub/player"

    async def fetch_result_summary(
        self,
        speed: Optional[SpeedType] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        color: Optional[str] = None,
    ) -> ResultSummary:
        username = self.username.lower()
        speed = speed or SpeedType.BLITZ
        expected_time_class = (
            "daily" if speed == SpeedType.CLASSICAL else speed.value
        )

        if start_date is None and end_date is None:
            try:
                resp = get_player_stats(username)
            except Exception as e:
                raise HTTPException(
                    status_code=503,
                    detail=f"Failed to fetch stats via wrapper: {e}",
                )
            stats = resp.stats
            game_stats = getattr(stats, f"chess_{expected_time_class}", None)
            record = game_stats.record if game_stats and game_stats.record else None

            wins = record.win or 0 if record else 0
            losses = record.loss or 0 if record else 0
            draws = record.draw or 0 if record else 0

            return ResultSummary(
                wins=wins,
                losses=losses,
                draws=draws,
                speed=speed,
            )

        start_date = start_date or date.min
        end_date = end_date or date.max

        wins = losses = draws = 0
        seen_game_ids: set[str] = set()

        ym_re = re.compile(r"/games/archives/(\d{4})/(\d{2})$")

        async with httpx.AsyncClient() as client:
            try:
                archive_url = f"{self.BASE_URL}/{username}/games/archives"
                resp = await client.get(archive_url)
                resp.raise_for_status()
                archive_urls = resp.json().get("archives", [])
            except Exception as e:
                raise HTTPException(
                    status_code=503,
                    detail=f"Failed to fetch archive list: {e}",
                )

            for url in archive_urls:
                m = ym_re.search(url)
                if m:
                    yr, mo = int(m.group(1)), int(m.group(2))
                    month_start = date(yr, mo, 1)
                    if month_start > end_date or (yr, mo) < (start_date.year, start_date.month):
                        continue

                try:
                    resp = await client.get(url)
                    resp.raise_for_status()
                    games = resp.json().get("games", [])
                except Exception:
                    continue

                for game in games:
                    game_id = game.get("url")
                    if not game_id or game_id in seen_game_ids:
                        continue
                    seen_game_ids.add(game_id)

                    if game.get("time_class") != expected_time_class:
                        continue

                    end_ts = game.get("end_time")
                    if not end_ts:
                        continue
                    game_end = datetime.utcfromtimestamp(end_ts).date()
                    if not (start_date <= game_end <= end_date):
                        continue

                    white = game.get("white", {})
                    black = game.get("black", {})
                    if white.get("username", "").lower() == username:
                        player_color = "white"
                        result_code = white.get("result")
                    elif black.get("username", "").lower() == username:
                        player_color = "black"
                        result_code = black.get("result")
                    else:
                        continue

                    if color and player_color != color.lower():
                        continue

                    wins, losses, draws = self._tally_result(
                        result_code, wins, losses, draws
                    )

        return ResultSummary(
            wins=wins,
            losses=losses,
            draws=draws,
            speed=speed,
        )

    def _tally_result(
        self, result: str, wins: int, losses: int, draws: int
    ) -> tuple[int, int, int]:
        """
        Increment counters based on known Chess.com result codes.
        Unrecognized codes are ignored.
        """
        code = (result or "").lower()

        win_codes = {
            "win", "kingofthehill", "threecheck",
        }
        loss_codes = {
            "checkmated", "resigned", "timeout", "lose", "abandoned", "bughousepartnerlose",
        }
        draw_codes = {
            "agreed", "repetition", "stalemate",
            "insufficient", "50move", "timevsinsufficient",
        }

        if code in win_codes:
            wins += 1
        elif code in loss_codes:
            losses += 1
        elif code in draw_codes:
            draws += 1

        return wins, losses, draws

    async def fetch_rating_history(
        self,
        speed: Optional[SpeedType] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
    ) -> List[RatingInsight]:
        """Fetch daily rating history, filling gaps with the last known rating."""
        speed = speed or SpeedType.BLITZ
        expected_time_class = "daily" if speed == SpeedType.CLASSICAL else speed.value

        start_date = start_date or date.min
        end_date = end_date or date.max

        cur = date(start_date.year, start_date.month, 1)
        last_month = date(end_date.year, end_date.month, 1)
        months: List[tuple[int, int]] = []
        while cur <= last_month:
            months.append((cur.year, cur.month))
            if cur.month == 12:
                cur = date(cur.year + 1, 1, 1)
            else:
                cur = date(cur.year, cur.month + 1, 1)

        last_by_date: dict[date, tuple[int, int]] = {}
        async with httpx.AsyncClient() as client:
            for yr, mo in months:
                url = f"{self.BASE_URL}/{self.username}/games/{yr}/{mo:02d}"
                try:
                    resp = await client.get(url)
                    resp.raise_for_status()
                except httpx.HTTPStatusError:
                    continue
                except httpx.RequestError:
                    continue

                data = resp.json()
                for game in data.get("games", []):
                    if game.get("time_class") != expected_time_class:
                        continue

                    end_ts = game.get("end_time")
                    if not end_ts:
                        continue

                    game_day = datetime.utcfromtimestamp(end_ts).date()
                    if not (start_date <= game_day <= end_date):
                        continue

                    white = game.get("white", {})
                    black = game.get("black", {})
                    uname = self.username.lower()
                    if white.get("username", "").lower() == uname:
                        rating = white.get("rating")
                    elif black.get("username", "").lower() == uname:
                        rating = black.get("rating")
                    else:
                        continue

                    prev = last_by_date.get(game_day)
                    if not prev or end_ts > prev[0]:
                        last_by_date[game_day] = (end_ts, rating)

        ratings_by_date = {d: r for d, (_, r) in sorted(last_by_date.items())}
        full_insights: List[RatingInsight] = []
        current = start_date
        last_known: int = 0
        if ratings_by_date:
            first_day = min(ratings_by_date)
            last_known = ratings_by_date[first_day]
        while current <= end_date:
            if current in ratings_by_date:
                last_known = ratings_by_date[current]
            full_insights.append(RatingInsight(date=current, rating=last_known or 0))
            current += timedelta(days=1)

        return full_insights
