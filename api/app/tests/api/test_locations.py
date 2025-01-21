from fastapi.testclient import TestClient
from app.core.db import nosql_collection
from app.core.config import settings
from datetime import datetime


def test_latest_locations(client: TestClient):
    collection = nosql_collection()

    # Add a location to the collection
    data = {"result": [{
        "Lines": "225",
        "Lon": 21.115116,
        "VehicleNumber": "1000",
        "Time": "2025-01-17 23:33:12",
        "Lat": 52.23458,
        "Brigade": "501"
    }], 'timestamp': datetime.now()}

    collection.insert_one(data)

    response = client.post(
        f"{settings.API_V1_STR}/location/",
    )

    assert response.status_code == 200
    content = response.json()
    assert isinstance(data['result'], list)
    assert len(content['result']) >= 1
