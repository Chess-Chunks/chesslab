"""Chess.com user statistics endpoint."""

from fastapi import APIRouter, HTTPException
from chessdotcom import get_player_stats
from ..models import UserStatsResponse

router = APIRouter()

@router.get("/api/v1/users/chessdotcom/{username}/results", response_model=UserStatsResponse)
def get_chesscom_user_stats(username: str):
    """
    Retrieve user statistics from Chess.com.
    """
    try:
        response = get_player_stats(username)
        stats = response.json.get("stats", {})  # stays as-is
        
        if not stats:
            raise HTTPException(status_code=404, detail="Stats not found for user.")

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
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
