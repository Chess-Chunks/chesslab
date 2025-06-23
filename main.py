"""FastAPI application with adapter-based chess insights API"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import insights 

app = FastAPI(title="Chess Insights API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(insights.router)
