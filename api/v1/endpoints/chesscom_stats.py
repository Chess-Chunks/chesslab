"""Chess.com user statistics endpoint."""

from fastapi import APIRouter, HTTPException
from chessdotcom import get_player_stats
from models.models import UserStatsResponse

router = APIRouter(prefix="/api/v1/user", tags=["chesscom"])

@router.get("/{username}/chesscom/results", response_model=UserStatsResponse)
def get_chesscom_user_stats(username: str):
    """
    Retrieve user statistics from Chess.com."""
    try:
        response = get_player_stats(username)
        stats = response.json["stats"]
    except Exception:
        raise HTTPException(status_code=404, detail="User not found or data unavailable")

    wins = losses = draws = 0
    for mode in stats.values():
        record = mode.get("record")
        if record:
            wins += record.get("win", 0)
            losses += record.get("loss", 0)
            draws += record.get("draw", 0)

    return UserStatsResponse(
        username=username,
        wins=wins,
        losses=losses,
        draws=draws
    )
