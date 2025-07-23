"""FastAPI application with adapter-based chess insights API"""

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import httpx
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import insights 
from chessdotcom import Client


app = FastAPI(title="Chess Insights API")

Client.request_config["headers"]["User-Agent"] = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/123.0.0.0 Safari/537.36"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://chesslab-frontend:8080", "https://chesslab.joelhutchinson.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(httpx.ConnectTimeout)
async def timeout_exception_handler(request: Request, exc: httpx.ConnectTimeout):
    return JSONResponse(
        status_code=504,
        content={"detail": "External service timeout (e.g., Chess.com or Lichess)"}
    )

app.include_router(insights.router)
