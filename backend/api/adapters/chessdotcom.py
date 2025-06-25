"""Chess.com API Adapter for fetching player statistics."""

from typing import Optional
from datetime import date
from fastapi import HTTPException
from chessdotcom.endpoints import player_stats
from api.models.insights import ResultSummary
from api.adapters.base import BaseImportAdapter
from api.enums import SpeedType

class ChessDotComAdapter(BaseImportAdapter):

    @property
    def BASE_URL(self) -> str:
        return "https://api.chess.com/pub/player"

    async def fetch_result_summary(
        self,
        speed: Optional[SpeedType] = None,
    ) -> ResultSummary:
        try:
            result = player_stats.get_player_stats(self.username)
        except Exception as e:
            raise HTTPException(status_code=503, detail=f"Failed to fetch stats from Chess.com: {str(e)}")

        stats = result.stats
        if isinstance(speed, str):
            try:
                speed = SpeedType(speed)
            except ValueError:
                raise HTTPException(status_code=400, detail=f"Invalid speed: {speed}")

        speeds = [speed] if speed else list(SpeedType)

        wins, losses, draws = 0, 0, 0

        for s in speeds:
            key = s.platform_key("chessdotcom")
            game_stats = getattr(stats, key, None)
            record = getattr(game_stats, "record", None)

            if not record:
                continue

            wins += record.win or 0
            losses += record.loss or 0
            draws += record.draw or 0

        return ResultSummary(
            wins=wins,
            losses=losses,
            draws=draws,
            speed=speed if speed else SpeedType.BLITZ
        )
