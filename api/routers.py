from fastapi import APIRouter

from .endpoints import (
    lichess_stats,
    chesscom_stats,
)

APP_ROUTERS = [
    lichess_stats.router,
    chesscom_stats.router,
]

all_routers = APIRouter()

for router in APP_ROUTERS:
    all_routers.include_router(router)
