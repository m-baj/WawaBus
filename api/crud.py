from sqlmodel import Session, select
from app.models.notification import Notification
from typing import List


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
