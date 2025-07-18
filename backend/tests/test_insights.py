"""Test cases for the insights endpoints in the API.
"""
from unittest.mock import AsyncMock, patch
from api.enums import SpeedType

@patch("api.endpoints.insights.get_adapter")
def test_get_user_result_summary(mock_get_adapter, client, mock_result_summary):
    """
    Test the /results endpoint returns the mocked summary
    and invokes fetch_result_summary with the correct args.
    """
    mock_adapter = AsyncMock()
    mock_adapter.fetch_result_summary.return_value = mock_result_summary
    mock_get_adapter.return_value = mock_adapter

    response = client.get("/api/v1/users/lichess/janedoe/results?speed=rapid")
    assert response.status_code == 200

    data = response.json()
    assert data["wins"]   == mock_result_summary.wins
    assert data["losses"] == mock_result_summary.losses
    assert data["draws"]  == mock_result_summary.draws
    assert data["speed"]  == mock_result_summary.speed.value

    mock_adapter.fetch_result_summary.assert_awaited_once_with(
        speed=SpeedType.RAPID,
        start_date=None,
        end_date=None,
        color=None,
    )


@patch("api.endpoints.insights.get_adapter")
def test_get_user_rating_history(mock_get_adapter, client, mock_rating_insights):
    """
    Test the /rating-history endpoint returns the mocked list
    and invokes fetch_rating_history with the correct args.
    """
    mock_adapter = AsyncMock()
    mock_adapter.fetch_rating_history.return_value = mock_rating_insights
    mock_get_adapter.return_value = mock_adapter

    response = client.get("/api/v1/users/lichess/janedoe/rating-history?speed=blitz")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)

    assert data[0]["rating"] == mock_rating_insights[0].rating
    assert data[1]["rating"] == mock_rating_insights[1].rating

    mock_adapter.fetch_rating_history.assert_awaited_once_with(
        speed=SpeedType.BLITZ,
        start_date=None,
        end_date=None,
    )
