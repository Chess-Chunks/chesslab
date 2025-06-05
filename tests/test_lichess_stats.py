""" Unit tests for Lichess user results retrieval API."""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_user_results_success():
    """Test retrieving user results successfully."""
    response = client.get("/api/v1/user/mbband/results")

    assert response.status_code == 200
    data = response.json()

    assert "username" in data
    assert data["username"].lower() == "mbband"
    assert all(key in data for key in ["wins", "losses", "draws"])
    assert all(isinstance(data[key], int) for key in ["wins", "losses", "draws"])

def test_get_user_results_not_found():
    """Test retrieving user results for a non-existent user."""
    response = client.get("/api/v1/user/sally_bish_you_are_cinnamon/results")

    assert response.status_code == 404
    assert "detail" in response.json()