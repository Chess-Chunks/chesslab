""""Test cases for Lichess user statistics endpoint."""

from fastapi.testclient import TestClient
from unittest.mock import patch
from main import app
from api.models.models import UserStatsResponse

client = TestClient(app)

@patch("analytics_backend.api.endpoints.lichess_stats.lichess.api.user")
def test_get_lichess_user_stats(mock_lichess_user):
    mock_lichess_user.return_value = {
        "id": "testuser",
        "count": {"win": 12, "loss": 6, "draw": 2}
    }

    response = client.get("/user/testuser/results")
    assert response.status_code == 200
    data = response.json()
    expected = UserStatsResponse(username="testuser", wins=12, losses=6, draws=2).dict()
    assert data == expected

@patch("analytics_backend.api.endpoints.lichess_stats.lichess.api.user")
def test_lichess_user_not_found(mock_lichess_user):
    mock_lichess_user.return_value = None  # or {}

    response = client.get("/user/testuser/results")
    assert response.status_code == 404
    assert "User not found" in response.json()["detail"]

