"""Lichess API Adapter for fetching chess insights."""

from typing import List, Optional
from datetime import date
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

    async def fetch_rating_history(self, speed: Optional[SpeedType] = None) -> List[RatingInsight]:
        user = lichess.api.user(self.username)
        perfs = user.get("perfs", {})
        speed_types = [speed] if speed else ["bullet", "blitz", "rapid", "classical"]

        results = []
        for s in speed_types:
            rating = perfs.get(self._get_speed_perf_key(s), {}).get("rating")
            if rating:
                results.append(RatingInsight(
                    date="recent",
                    rating=rating,
                    speed=s
                ))
        return results

    async def fetch_result_summary(
        self,
        speed: Optional[SpeedType] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None
    ) -> ResultSummary:
        user = lichess.api.user(self.username)
        perfs = user.get("perfs", {})
        key = self._get_speed_perf_key(speed or "blitz")

        perf = perfs.get(key, {})
        return ResultSummary(
            wins=perf.get("wins", 0),
            losses=perf.get("losses", 0),
            draws=perf.get("draws", 0),
            speed=speed or "blitz"
        )
