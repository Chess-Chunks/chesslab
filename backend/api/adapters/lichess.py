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
        end_date: Optional[date] = None
    ) -> ResultSummary:
        speed_key = self._get_speed_perf_key(speed) if speed else "blitz"
        url = f"{self.BASE_URL}/user/{self.username}/perf/{speed_key}"

        async with ClientSession() as session:
            async with session.get(url) as response:
                response.raise_for_status()
                data = await response.json()

        stats = data.get("stat", {}).get("count", {})
        return ResultSummary(
            wins=stats.get("win", 0),
            losses=stats.get("loss", 0),
            draws=stats.get("draw", 0),
            speed=speed or "blitz"
        )