from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utilities import create_random_user


def test_add_notification(client: TestClient, db: Session) -> None:
    user = create_random_user(db)
    assert user.id
    response = client.post(
        f"{settings.API_V1_STR}/notifications/",
        json={
            "line": "123",
            "stop": "Main St",
            "email": "test@example.com",
            "time": "2023-12-31T23:59:59",
            "user_id": user.id
        }
    )
    assert response.status_code == 200
    content = response.json()
    assert content["line"] == "123"
    assert content["stop"] == "Main St"
    assert content["email"] == "test@example.com"


def test_list_notifications(client: TestClient) -> None:
    response = client.get(f"{settings.API_V1_STR}/notifications/")
    assert response.status_code == 200
    content = response.json()
    assert isinstance(content, list)


def test_delete_notification(client: TestClient, db: Session) -> None:
    user = create_random_user(db)
    assert user.id
    response = client.post(
        f"{settings.API_V1_STR}/notifications/",
        json={
            "line": "321",
            "stop": "Main St",
            "email": "test@example.com",
            "time": "2023-12-31T23:59:59",
            "user_id": user.id
        }
    )
    assert response.status_code == 200
    content = response.json()

    response = client.delete(f"{settings.API_V1_STR}/notifications/{content['id']}")
    assert response.status_code == 200
    content = response.json()
    assert content["id"] == content["id"]
    assert content["line"] == "321"
    assert content["stop"] == "Main St"


def test_list_user_notifications(client: TestClient, db: Session) -> None:
    user = create_random_user(db)
    assert user.id
    response = client.post(
        f"{settings.API_V1_STR}/notifications/",
        json={
            "line": "321",
            "stop": "Main St",
            "email": "test@example.com",
            "time": "2023-12-31T23:59:59",
            "user_id": user.id
        }
    )
    assert response.status_code == 200

    response = client.get(f"{settings.API_V1_STR}/notifications/user/{user.id}")
    assert response.status_code == 200
    content = response.json()
    assert isinstance(content, list)
    first = content[0]
    assert first["line"] == "321"
    assert first["stop"] == "Main St"
