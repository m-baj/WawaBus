from sqlmodel import Session, select
from app.models import User
from datetime import datetime, timedelta
# from pymongo import MongoClient
# from app.core.config import settings
from app.core.db import nosql_collection

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

def check_bus_status(line: str) -> bool:
    collection = nosql_collection()

    current_time = datetime.now()

    bus_data = collection.find({"Lines": line}).sort("Time", -1).limit(1)

    if bus_data:
        last_movement_time = datetime.strptime(bus_data[0]["Time"], "%Y-%m-%d %H:%M:%S")
        if current_time - last_movement_time <= timedelta(minutes=2):
            return True

    return False