"""Chess.com Adapter for fetching chess ratings and results."""

from typing import List, Optional
from datetime import date
import httpx
from api.models.insights import RatingInsight, ResultSummary
from api.adapters.base import BaseImportAdapter, SpeedType

SPEED_MAP = {
    "bullet": "chess_bullet",
    "blitz": "chess_blitz",
    "rapid": "chess_rapid",
    "classical": "chess_daily"  
}

class ChessDotComAdapter(BaseImportAdapter):
    """Adapter for fetching insights from Chess.com."""
    BASE_URL = "https://api.chess.com/pub/player"

    async def fetch_rating_history(self, speed: Optional[SpeedType] = None) -> List[RatingInsight]:
        url = f"{self.BASE_URL}/{self.username}/stats"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url)
            data = resp.json()

        insights = []
        speed_types = [speed] if speed else ["bullet", "blitz", "rapid", "classical"]
        for s in speed_types:
            key = SPEED_MAP.get(s)
            if key in data:
                rating = data[key].get("last", {}).get("rating")
                if rating:
                    insights.append(RatingInsight(
                        date="recent",
                        rating=rating,
                        speed=s
                    ))
        return insights

    async def fetch_result_summary(
        self,
        speed: Optional[SpeedType] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None
    ) -> ResultSummary:
        """Fetch total wins, losses, and draws for the user."""
        url = f"{self.BASE_URL}/{self.username}/stats"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url)
            data = resp.json()

        key = SPEED_MAP.get(speed or "", None)
        if not key or key not in data:
            return ResultSummary(wins=0, losses=0, draws=0, speed=speed or "blitz")

        record = data[key].get("record", {})
        return ResultSummary(
            wins=record.get("win", 0),
            losses=record.get("loss", 0),
            draws=record.get("draw", 0),
            speed=speed or "blitz"
        )
