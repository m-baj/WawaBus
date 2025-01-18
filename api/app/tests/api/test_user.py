from fastapi.testclient import TestClient
from sqlmodel import Session

from app.core.config import settings
from app.tests.utilities import create_random_user


def test_user_by_id(client: TestClient, db: Session) -> None:
    user = create_random_user(db)
    assert user.id
    response = client.get(f"{settings.API_V1_STR}/users/id={user.id}")
    assert response.status_code == 200
    content = response.json()
    assert content["email"] == user.email
    assert content["id"] == user.id


def test_user_by_username(client: TestClient, db: Session) -> None:
    user = create_random_user(db)
    assert user.id
    response = client.get(f"{settings.API_V1_STR}/users/username={user.email}")
    assert response.status_code == 200
    content = response.json()
    assert content["email"] == user.email
    assert content["id"] == user.id
