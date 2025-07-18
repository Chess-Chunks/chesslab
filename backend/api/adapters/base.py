"""Base class for importing chess data from various platforms."""

from abc import ABC, abstractmethod
from typing import Literal, Optional, List
from datetime import date
from api.models.insights import ResultSummary
from api.enums import SpeedType

class BaseImportAdapter(ABC):
    """Base class for importing chess data from various platforms."""
    def __init__(self, username: str):
        self.username = username

    @property
    @abstractmethod
    def BASE_URL(self) -> str:
        """Base URL for the platform API."""
        pass

    @abstractmethod
    async def fetch_result_summary(
        self,
        speed: Optional[SpeedType] = None,
    ) -> ResultSummary:
        """
        Fetch total wins, losses, and draws for the user,
        optionally filtered by speed type and date range.
        """
        pass

    @abstractmethod
    async def fetch_rating_history(
        self,
        start_date: Optional[date] = None,
        end_date: Optional[date] = None,
    ) -> List["RatingInsight"]:
        """
        Fetch the user's daily rating history for the specified speed,
        optionally filtered by date range.
        Only Bullet, Blitz, Rapid, Classical must be supported.
        """
        pass