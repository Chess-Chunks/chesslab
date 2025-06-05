from fastapi import APIRouter, HTTPException
import os
import lichess.api


router = APIRouter()

@router.get("/user/{username}/results")
def get_user_results(username: str):
    try:
        user = lichess.api.user(username)
        count = user.get("count", {})
        return {
            "username": username,
            "wins": count.get("win", 0),
            "losses": count.get("loss", 0),
            "draws": count.get("draw", 0),
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"User not found or API error: {str(e)}")