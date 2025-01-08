from sqlmodel import Session, select
from app.models.notification import Notification
from typing import List
from datetime import datetime, timedelta
from pymongo import MongoClient
from data_retrieval.config import settings


def create_notification(session: Session, email: str, line: str, stop: str, time: str) -> Notification:
    notification = Notification(email=email, line=line, stop=stop, time=time)
    session.add(notification)
    session.commit()
    session.refresh(notification)
    return notification

def get_notifications(session: Session) -> List[Notification]:
    statement = select(Notification)
    return session.exec(statement).all()

def get_notification_by_id(session: Session, notification_id: int) -> Notification:
    return session.get(Notification, notification_id)

def delete_notification(session: Session, notification_id: int) -> None:
    notification = session.get(Notification, notification_id)
    if notification:
        session.delete(notification)
        session.commit()

def check_bus_status(line: str) -> bool:
    client = MongoClient(f"mongodb://{settings.MONGO_USERNAME}:{settings.MONGO_PASSWORD}@{settings.MONGO_HOST}")
    db = client[settings.MONGO_DATABASE]
    collection = db.get_collection()

    current_time = datetime.now()

    bus_data = collection.find({"Lines": line}).sort("Time", -1).limit(1)

    if bus_data:
        last_movement_time = datetime.strptime(bus_data[0]["Time"], "%Y-%m-%d %H:%M:%S")
        if current_time - last_movement_time <= timedelta(minutes=2):
            return True

    return False
