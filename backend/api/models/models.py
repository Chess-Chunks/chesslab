"""Models for """

from pydantic import BaseModel

class UserStatsResponse(BaseModel):
    """"""
    username: str
    wins: int
    losses: int
    draws: int
