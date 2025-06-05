"""FastAPI application with basic routes"""

from fastapi import FastAPI
from api.v1.endpoints import lichess_stats

app = FastAPI()

app.include_router(lichess_stats.router, prefix="/api/v1", tags=["lichess"])