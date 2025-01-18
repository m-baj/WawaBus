from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, delete

from app.core.db import init_db, engine
from app.main import app
from app.models import User, Notification


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        init_db()
        yield session
