""" Test cases for chess.com user statistics endpoint."""

from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main import app
from api.models.models import UserStatsResponse

client = TestClient(app)

@patch("api.endpoints.chesscom_stats.get_player_stats")
def test_get_chesscom_user_stats(mock_get_player_stats):
    mock_response = MagicMock()
    mock_response.json = {
        "stats": {
            "chess_rapid": {"record": {"win": 10, "loss": 5, "draw": 3}},
            "chess_blitz": {"record": {"win": 7, "loss": 8, "draw": 2}},
        }
    }
    mock_get_player_stats.return_value = mock_response

    response = client.get("/api/v1/users/chessdotcom/testuser/results")
    assert response.status_code == 200
    data = response.json()
    expected = UserStatsResponse(username="testuser", wins=17, losses=13, draws=5).dict()
    assert data == expected

@patch("api.endpoints.chesscom_stats.get_player_stats")
def test_chesscom_user_stats_not_found(mock_get_player_stats):
    mock_response = MagicMock()
    mock_response.json = {"stats": {}}  
    mock_get_player_stats.return_value = mock_response

    response = client.get("/api/v1/users/chessdotcom/testuser/results")
    assert response.status_code == 404
    assert response.json()["detail"] == "Stats not found for user."
