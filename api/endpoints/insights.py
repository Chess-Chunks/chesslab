"""This module provides endpoints for fetching user insights from chess platforms."""

from typing import Optional
from datetime import date
from fastapi import APIRouter, HTTPException, Query
from api.adapters.base import BaseImportAdapter, SpeedType
from api.adapters.chessdotcom import ChessDotComAdapter
from api.adapters.lichess import LichessAdapter
from api.models.insights import RatingInsight, ResultSummary

router = APIRouter()

PLATFORM_ADAPTERS = {
    "chessdotcom": ChessDotComAdapter,
    "lichess": LichessAdapter,
}

def get_adapter(platform: str, username: str) -> BaseImportAdapter:
    """Get the appropriate adapter for the specified platform."""
    adapter_cls = PLATFORM_ADAPTERS.get(platform.lower())
    if not adapter_cls:
        raise HTTPException(status_code=400, detail=f"Unsupported platform: {platform}")
    return adapter_cls(username)

@router.get("/api/v1/users/{platform}/{username}/ratings", response_model=list[RatingInsight])
async def get_user_rating_history(
    platform: str,
    username: str,
    speed: Optional[SpeedType] = Query(None, description="bullet, blitz, rapid, classical")
):
    """Fetch the user's rating history for a specific platform."""
    adapter = get_adapter(platform, username)
    return await adapter.fetch_rating_history(speed=speed)

@router.get("/api/v1/users/{platform}/{username}/results", response_model=ResultSummary)
async def get_user_result_summary(
    platform: str,
    username: str,
    speed: Optional[SpeedType] = Query(None, description="bullet, blitz, rapid, classical"),
    start_date: Optional[date] = Query(None),
    end_date: Optional[date] = Query(None),
):
    """Fetch the user's game results summary for a specific platform."""
    adapter = get_adapter(platform, username)
    return await adapter.fetch_result_summary(
        speed=speed,
        start_date=start_date,
        end_date=end_date
    )
