"""Test cases for the insights API endpoints."""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch
from datetime import date

from main import app 
from api.models.insights import RatingInsight, ResultSummary

client = TestClient(app)

@pytest.fixture
def mock_rating_insights():
    return [
        RatingInsight(rating=1500, speed="blitz"),
        RatingInsight(rating=1520, speed="blitz"),
    ]

@pytest.fixture
def mock_result_summary():
    return ResultSummary(wins=10, losses=5, draws=2, speed="rapid")

@patch("api.endpoints.insights.get_adapter")
def test_get_user_result_summary(mock_get_adapter, mock_result_summary):
    mock_adapter = AsyncMock()
    mock_adapter.fetch_result_summary.return_value = mock_result_summary
    mock_get_adapter.return_value = mock_adapter

    response = client.get("/api/v1/users/lichess/janedoe/results?speed=rapid")

    assert response.status_code == 200
    data = response.json()
    assert data["wins"] == 10
    assert data["losses"] == 5
    assert data["draws"] == 2
    assert data["speed"] == "rapid"
    mock_adapter.fetch_result_summary.assert_awaited_once_with(
        speed="rapid",
    )
