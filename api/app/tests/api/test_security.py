from fastapi.testclient import TestClient

from app.core.config import settings


def test_register(client: TestClient) -> None:
    response = client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={"email": "test@example.com", "password": "password"}
    )
    assert response.status_code == 200
    content = response.json()
    assert content["email"] == "test@example.com"


def test_register_existing_user(client: TestClient) -> None:
    response = client.post(
        f"{settings.API_V1_STR}/auth/register",
        json={"email": "test@example.com", "password": "password"}
    )
    assert response.status_code == 400
    content = response.json()
    assert content["detail"] == "Email already registered"


def test_login(client: TestClient) -> None:
    response = client.post(
        f"{settings.API_V1_STR}/auth/login?email=test%40example.com&password=password",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["access_token"]
    assert content["token_type"] == "bearer"
