from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from app.core.email import send_email
from app.models import Notification
from app.core.db import get_session
from app.core.location_retriever import get_bus_locations
from app.crud import get_user_notifications

def send_scheduled_email(notification_id: str):
    session = next(get_session())
    notification = session.get(Notification, notification_id)
    if notification:
        current_time = datetime.now()
        notification_time = notification.time.replace(year=current_time.year, month=current_time.month, day=current_time.day)
        if current_time >= notification_time:
            bus_data = get_bus_locations()
            if bus_data and notification.line in bus_data["Lines"]:
                last_movement_time = datetime.strptime(bus_data["Time"], "%Y-%m-%d %H:%M:%S")
                if current_time - last_movement_time <= timedelta(minutes=2):
                    email_data = {
                        "to": [notification.email],
                        "subject": "Scheduled Notification",
                        "body": f"""
                            <html>
                                <body>
                                    <p>Your scheduled notification for line <b>{notification.line}</b> at stop <b>{notification.stop}</b> is due now.</p>
                                </body>
                            </html>
                        """
                    }
                    send_email(email_data)

def start_scheduler(user_id: int):
    scheduler = BackgroundScheduler()
    session = next(get_session())
    notifications = get_user_notifications(session, user_id)
    for notification in notifications:
        scheduler.add_job(
            send_scheduled_email,
            'cron',
            hour=notification.time.hour,
            minute=notification.time.minute,
            args=[notification.id]
        )
    scheduler.start()