"""This module defines data models for insights related to chess ratings and results."""

from datetime import date
from pydantic import BaseModel
from api.enums import SpeedType

class RatingInsight(BaseModel):
    """Single-day rating for a given speed."""
    date: date
    rating: int


class ResultSummary(BaseModel):
    """Model for summarizing game results."""
    wins: int
    losses: int
    draws: int
    speed: SpeedType
