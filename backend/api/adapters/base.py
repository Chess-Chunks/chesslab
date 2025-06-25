"""Base class for importing chess data from various platforms."""

from abc import ABC, abstractmethod
from typing import Literal, Optional
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
