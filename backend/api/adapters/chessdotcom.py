"""Chess.com API Adapter for fetching player statistics via raw HTTP."""

from typing import Optional
from datetime import date, datetime
import httpx
from fastapi import HTTPException

from api.models.insights import ResultSummary
from api.adapters.base import BaseImportAdapter
from api.enums import SpeedType


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
        wins, losses, draws = 0, 0, 0
        seen_game_ids = set()

        async with httpx.AsyncClient() as client:
            # Fetch archive list
            try:
                archive_url = f"{self.BASE_URL}/{username}/games/archives"
                resp = await client.get(archive_url)
                resp.raise_for_status()
                archive_urls = resp.json().get("archives", [])
            except Exception as e:
                raise HTTPException(status_code=503, detail=f"Failed to fetch archive list: {str(e)}")

            start_date = start_date or date.min
            end_date = end_date or date.max

            for url in archive_urls:

                try:
                    resp = await client.get(url)
                    resp.raise_for_status()
                    games = resp.json().get("games", [])
                except Exception:
                    continue

                for game in games:

                    game_id = game.get("url") or game.get("pgn")
                    if not game_id:
                        continue

                    if game_id in seen_game_ids:
                        print(f"[DUPLICATE] Game already counted: {game_id}")
                        continue
                    seen_game_ids.add(game_id)


                    if speed:
                        expected_time_class = "daily" if speed == SpeedType.CLASSICAL else speed.value
                        if game.get("time_class") != expected_time_class:
                            continue

                    end_ts = game.get("end_time")
                    if end_ts:
                        game_end_date = datetime.fromtimestamp(end_ts).date()
                        if not (start_date <= game_end_date <= end_date):
                            continue

                    white = game.get("white", {})
                    black = game.get("black", {})

                    if white.get("username", "").lower() == username:
                        player_color = "white"
                        result = white.get("result")
                    elif black.get("username", "").lower() == username:
                        player_color = "black"
                        result = black.get("result")
                    else:
                        continue

                    if color and player_color != color:
                        continue

                    wins, losses, draws = self._tally_result(result, wins, losses, draws)

        return ResultSummary(
            wins=wins,
            losses=losses,
            draws=draws,
            speed=speed or SpeedType.BLITZ,
        )

    def _tally_result(self, result: str, wins: int, losses: int, draws: int) -> tuple[int, int, int]:
        """Increment counters based on known result codes."""

        win_codes = {"win"}
        loss_codes = {
            "resigned", "timeout", "checkmated",
        }
        draw_codes = {
            "agreed", "repetition", "stalemate",
            "insufficient", "50move",
        }

        if result in win_codes:
            wins += 1
        elif result in loss_codes:
            losses += 1
        elif result in draw_codes:
            draws += 1

        return wins, losses, draws
