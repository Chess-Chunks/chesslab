from abc import ABC, abstractmethod
from typing import Literal, Optional
from datetime import date
from api.models.insights import RatingInsight, ResultSummary

SpeedType = Literal["bullet", "blitz", "rapid", "classical"]

class BaseImportAdapter(ABC):
    """Base class for chess platform adapters to fetch user insights."""
    def __init__(self, username: str):
        self.username = username

    @abstractmethod
    async def fetch_result_summary(
        self,
        speed: Optional[SpeedType] = None,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None
    ) -> ResultSummary:
        """
        Fetch total wins, losses, and draws for the user,
        optionally filtered by speed type and date range.
        """
        pass
