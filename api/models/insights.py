"""This module defines data models for insights related to chess ratings and results."""

from typing import Literal
from pydantic import BaseModel

SpeedType = Literal["bullet", "blitz", "rapid", "classical"]

class RatingInsight(BaseModel):
    """Model for rating insights."""
    rating: int
    speed: SpeedType

class ResultSummary(BaseModel):
    """Model for summarizing game results."""
    wins: int
    losses: int
    draws: int
    speed: SpeedType
