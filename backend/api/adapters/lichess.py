"""Lichess API Adapter for fetching chess insights."""

from typing import Optional, List
from datetime import date, timedelta, datetime
from aiohttp import ClientSession
import aiohttp
import json
import lichess.api
from api.models.insights import RatingInsight, ResultSummary
from api.adapters.base import BaseImportAdapter, SpeedType

class LichessAdapter(BaseImportAdapter):
    """Adapter for fetching insights from Lichess."""

    @property
    def BASE_URL(self) -> str:
        return "https://lichess.org/api"

    def _get_speed_perf_key(self, speed: SpeedType) -> str:
        return {
            "bullet": "bullet",
            "blitz": "blitz",
            "rapid": "rapid",
            "classical": "classical"
        }[speed]

    async def fetch_result_summary(
        self,
        speed: Optional[SpeedType] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
        color: Optional[str] = None,
    ) -> ResultSummary:
        speed_key = self._get_speed_perf_key(speed or SpeedType.BLITZ)

        # No date filtering: use perf endpoint (faster)
        if start_date is None and end_date is None:
            url = f"{self.BASE_URL}/user/{self.username}/perf/{speed_key}"
            async with ClientSession() as session:
                async with session.get(url) as response:
                    response.raise_for_status()
                    data = await response.json()

            stats = data.get("stat", {}).get("count", {})
            return ResultSummary(
                total=stats.get("total", 0),
                wins=stats.get("win", 0),
                losses=stats.get("loss", 0),
                draws=stats.get("draw", 0),
                speed=speed or SpeedType.BLITZ,
            )

        # Convert date range to timestamps
        start_ts = int(datetime.combine(start_date or date.min, datetime.min.time()).timestamp() * 1000)
        end_ts = int(datetime.combine(end_date or date.max, datetime.max.time()).timestamp() * 1000)
        
        url = (
            f"{self.BASE_URL}/games/user/{self.username}"
            f"?since={start_ts}&until={end_ts}&max=3000&perfType={speed_key}&pgnInJson=true"
        )
        headers = {"Accept": "application/x-ndjson"}

        wins = losses = draws = 0

        async with ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                async for line in response.content:
                    if not line.strip():
                        continue
                    try:
                        game = json.loads(line)
                    except json.JSONDecodeError:
                        continue

                    if game.get("speed") != speed_key:
                        continue

                    player_color = None
                    if game.get("players", {}).get("white", {}).get("user", {}).get("id", "").lower() == self.username.lower():
                        player_color = "white"
                    elif game.get("players", {}).get("black", {}).get("user", {}).get("id", "").lower() == self.username.lower():
                        player_color = "black"
                    else:
                        continue

                    winner = game.get("winner")

                    if (winner == "white" and player_color == "white") or (winner == "black" and player_color == "black"):
                        result = "win"
                    elif winner is None:
                        result = "draw"
                    else:
                        result = "loss"

                    if color and player_color != color.lower():
                        continue

                    if result == "win":
                        wins += 1
                    elif result == "loss":
                        losses += 1
                    elif result == "draw":
                        draws += 1

        return ResultSummary(
            total=wins + losses + draws,
            wins=wins,
            losses=losses,
            draws=draws,
            speed=speed or SpeedType.BLITZ,
        )

    async def fetch_rating_history(
        self,
        speed: Optional[SpeedType] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
    ) -> List[RatingInsight]:
        """
        Fetch the user's daily rating history, filling gaps with the last known rating.
        """
        perf_names = {
            SpeedType.BULLET:    "Bullet",
            SpeedType.BLITZ:     "Blitz",
            SpeedType.RAPID:     "Rapid",
            SpeedType.CLASSICAL: "Classical",
        }
        speeds_to_fetch = [speed] if speed else list(perf_names.keys())

        url = f"{self.BASE_URL}/user/{self.username}/rating-history"
        async with ClientSession() as session:
            async with session.get(url) as resp:
                resp.raise_for_status()
                all_perfs = await resp.json()

        raw_insights: List[RatingInsight] = []
        for sp in speeds_to_fetch:
            name = perf_names[sp]
            perf_obj = next((p for p in all_perfs if p.get("name") == name), None)
            if not perf_obj or not perf_obj.get("points"):
                continue
            for yr, mo0, day, rating in perf_obj["points"]:
                dt = date(yr, mo0 + 1, day)
                if start_date and dt < start_date:
                    continue
                if end_date and dt > end_date:
                    continue
                raw_insights.append(RatingInsight(date=dt, rating=rating))

        raw_insights.sort(key=lambda ri: ri.date)
        ratings_by_date = {ri.date: ri.rating for ri in raw_insights}

        start = start_date or (min(ratings_by_date) if ratings_by_date else date.today())
        end = end_date or (max(ratings_by_date) if ratings_by_date else date.today())

        full_insights: List[RatingInsight] = []
        current = start
        last_known = ratings_by_date.get(current)
        while current <= end:
            if current in ratings_by_date:
                last_known = ratings_by_date[current]
            full_insights.append(RatingInsight(date=current, rating=last_known or 0))
            current += timedelta(days=1)

        return full_insights