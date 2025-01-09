from sqlmodel import Session, select
from app.models import User


def get_user_by_email(session: Session, email: str) -> User:
    statement = select(User).where(User.email == email)
    return session.exec(statement).first()

def get_user_by_id(session: Session, user_id: int) -> User:
    return session.get(User, user_id)

def create_user(session: Session, email: str, hashed_password: str) -> User:
    user = User(email=email, hashed_password=hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

def get_user_notifications(session: Session, user_id: int):
    statement = select(User).where(User.id == user_id)
    user = session.exec(statement).first()
    return user.notifications
