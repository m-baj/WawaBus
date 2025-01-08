from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import List
from app.models import Notification, NotificationRequest
from app.core.db import get_session
from sqlmodel import select, Session
from app.core.email import send_email
from fastapi import BackgroundTasks

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.post("/", response_model=Notification)
def add_notification(request: NotificationRequest, session: Session = Depends(get_session), tasks: BackgroundTasks = BackgroundTasks()):
    current_time = datetime.now()
    notification_time = current_time.replace(hour=request.hour, minute=request.minute, second=0, microsecond=0)

    if notification_time <= current_time:
        notification_time += timedelta(days=1)

    task_id = f"{request.line}_{request.stop}_{notification_time.isoformat()}"

    statement = select(Notification).where(Notification.id == task_id)
    existing_notification = session.exec(statement).first()
    if existing_notification:
        raise HTTPException(status_code=400, detail="Zlecenie już istnieje")

    notification = Notification(
        id=task_id,
        line=request.line,
        stop=request.stop,
        email=request.email,
        time=notification_time,
        user_id=request.user_id
    )
    session.add(notification)
    session.commit()
    session.refresh(notification)
    email_data = {
        "to": [request.email],
        "subject": "Zlecenie zostało utworzone",
        "body": f"""
            <html>
                <body>
                    <p>Twoje zlecenie dla linii <b>{request.line}</b> na przystanku <b>{request.stop}</b> zostało pomyślnie utworzone.</p>
                </body>
            </html>
        """
    }
    print(email_data)
    tasks.add_task(send_email, email_data)
    return notification

@router.get("/", response_model=List[Notification])
def list_notifications(session: Session = Depends(get_session)):
    statement = select(Notification)
    results = session.exec(statement).all()
    return results

@router.delete("/{task_id}", response_model=Notification)
def delete_notification(task_id: str, session: Session = Depends(get_session)):
    statement = select(Notification).where(Notification.id == task_id)
    notification = session.exec(statement).first()
    if not notification:
        raise HTTPException(status_code=404, detail="Zlecenie nie istnieje")
    session.delete(notification)
    session.commit()
    return notification