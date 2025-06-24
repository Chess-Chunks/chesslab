"""Lichess API Adapter for fetching chess insights."""

from typing import Optional
from datetime import date, datetime
from aiohttp import ClientSession
import json
import lichess.api
from api.models.insights import RatingInsight, ResultSummary
from api.adapters.base import BaseImportAdapter, SpeedType

class LichessAdapter(BaseImportAdapter):
    """Adapter for fetching insights from Lichess."""

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
        end_date: Optional[date] = None
    ) -> ResultSummary:
        url = f"https://lichess.org/api/games/user/{self.username}"

        params = {
            "max": "100",
            "pgnInJson": "true",
            "clocks": "false",
            "moves": "false",
            "analysed": "false"
        }
        if speed:
            params["perfType"] = speed

        wins, losses, draws = 0, 0, 0

        async with ClientSession() as session:
            async with session.get(url, params=params, headers={"Accept": "application/x-ndjson"}) as resp:
                async for line in resp.content:
                    if not line.strip():
                        continue
                    game = json.loads(line.decode())

                    timestamp = datetime.utcfromtimestamp(game["createdAt"] // 1000).date()
                    if start_date and timestamp < start_date:
                        continue
                    if end_date and timestamp > end_date:
                        continue

                    color = "white" if game["players"]["white"]["user"]["name"].lower() == self.username.lower() else "black"
                    result = game["players"][color].get("result")

                    if result == "win":
                        wins += 1
                    elif result == "loss":
                        losses += 1
                    elif result == "draw":
                        draws += 1

        return ResultSummary(wins=wins, losses=losses, draws=draws, speed=speed or "blitz")
