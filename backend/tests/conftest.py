# tests/conftest.py

import pytest
from datetime import date
from fastapi.testclient import TestClient
from main import app
from api.models.insights import RatingInsight, ResultSummary

@pytest.fixture(scope="session")
def client():
    """FastAPI test client for all endpoint tests."""
    return TestClient(app)

@pytest.fixture
def mock_rating_insights():
    """A list of two RatingInsight objects for use in rating-history tests."""
    return [
        RatingInsight(date=date(2021, 9, 1), rating=1500),
        RatingInsight(date=date(2021, 9, 2), rating=1520),
    ]

@pytest.fixture
def mock_result_summary():
    """A single ResultSummary for use in result-summary tests."""
    return ResultSummary(wins=10, losses=5, draws=2, speed="rapid")
