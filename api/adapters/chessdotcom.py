"""Chess.com Adapter for fetching chess ratings and results."""

from typing import List, Optional
from datetime import datetime, date
import httpx
from chessdotcom import get_player_stats
from api.models.insights import ResultSummary
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

    async def fetch_result_summary(self, speed: Optional[SpeedType] = None, start_date: Optional[date] = None, end_date: Optional[date] = None) -> ResultSummary:
        result = get_player_stats(self.username)
        stats = result.stats

        speed_map = {
            "bullet": stats.chess_bullet,
            "blitz": stats.chess_blitz,
            "rapid": stats.chess_rapid,
            "classical": stats.chess_daily,
        }

        game_stats = speed_map.get(speed or "blitz")

        if not game_stats or not game_stats.record:
            return ResultSummary(wins=0, losses=0, draws=0, speed=speed or "blitz")

        record = game_stats.record

        return ResultSummary(
            wins=record.win or 0,
            losses=record.loss or 0,
            draws=record.draw or 0,
            speed=speed or "blitz"
        )
