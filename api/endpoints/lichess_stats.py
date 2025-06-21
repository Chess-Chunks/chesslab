from fastapi import APIRouter, HTTPException
import lichess.api
from ..models.models import UserStatsResponse 

router = APIRouter()

@router.get("/api/v1/users/lichess/{username}/results", response_model=UserStatsResponse)
def get_user_results(username: str):
    try:
        user = lichess.api.user(username)
        count = user.get("count", {})
        return UserStatsResponse(
            username=username,
            wins=count.get("win", 0),
            losses=count.get("loss", 0),
            draws=count.get("draw", 0),
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"User not found or API error: {str(e)}") from e