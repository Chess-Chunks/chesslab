"""FastAPI application with basic routes"""

from fastapi import FastAPI
from analytics_backend.api.endpoints import chesscom_stats, lichess_stats

app = FastAPI()

app.include_router(chesscom_stats.router)
app.include_router(lichess_stats.router)
