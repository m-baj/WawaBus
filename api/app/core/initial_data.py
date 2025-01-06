from sqlmodel import Session
from app.models import User
from datetime import date
from app.core.config import settings

from app.core.security import get_password_hash


def load_initial_data(session: Session):
    # Dodaj 2 użytkowników
    existing_user = session.query(User).first()
    print("existing_user: ", existing_user)
    if not existing_user:
        hashed_password = get_password_hash("user")
        users = [
        User(
            username="user",
            hashed_password=hashed_password,
        ),
        User(
            username="user_2",
            hashed_password=hashed_password,
        )]
        session.add_all(users)
        print("Użytkownicy został załadowani.")

    session.commit()
