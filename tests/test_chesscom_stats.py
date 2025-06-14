"""Test cases for Chess.com user statistics retrieval using FastAPI and mocking."""

from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app

client = TestClient(app)

@patch("analytics_backend.endpoints.chesscom_stats.get_player_stats")
def test_get_chesscom_user_stats_success(mock_get_player_stats):
    """Test successful retrieval of Chess.com user stats with mock."""
    mock_response = MagicMock()
    mock_response.json = {
        "stats": {
            "chess_rapid": {"record": {"win": 12, "loss": 4, "draw": 3}},
            "chess_blitz": {"record": {"win": 5, "loss": 1, "draw": 1}},
        }
    }
    mock_get_player_stats.return_value = mock_response

    response = client.get("/api/v1/user/testuser/chesscom/results")
    assert response.status_code == 200
    data = response.json()
    assert data == {
        "username": "testuser",
        "wins": 17,
        "losses": 5,
        "draws": 4
    }


@patch("analytics_backend.endpoints.chesscom_stats.get_player_stats")
def test_get_chesscom_user_stats_not_found(mock_get_player_stats):
    """Test Chess.com user not found scenario using mock."""
    mock_get_player_stats.side_effect = Exception("User not found")

    response = client.get("/api/v1/user/unknownuser/chesscom/results")
    assert response.status_code == 404
    assert "detail" in response.json()
