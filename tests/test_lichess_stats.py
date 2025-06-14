"""Test cases for Lichess user statistics API endpoints."""

from unittest.mock import patch
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

@patch("lichess.api.user")
def test_get_user_results_success(mock_lichess_user):
    """Test retrieving Lichess user results successfully with mock."""
    mock_lichess_user.return_value = {
        "count": {
            "win": 10,
            "loss": 5,
            "draw": 2
        }
    }

    response = client.get("/api/v1/user/testuser/results")
    assert response.status_code == 200

    data = response.json()
    assert data == {
        "username": "testuser",
        "wins": 10,
        "losses": 5,
        "draws": 2
    }

@patch("lichess.api.user")
def test_get_user_results_not_found(mock_lichess_user):
    """Test Lichess user not found scenario using mock."""
    mock_lichess_user.side_effect = Exception("User not found")

    response = client.get("/api/v1/user/unknownuser/results")
    assert response.status_code == 404
    assert "detail" in response.json()
