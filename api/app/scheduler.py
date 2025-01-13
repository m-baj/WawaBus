from apscheduler.schedulers.background import BackgroundScheduler
from app.core.email import send_email
from app.models import Notification
from app.core.db import get_session
from app.crud import check_bus_status

def send_scheduled_email(notification_id: str):
    session = next(get_session())
    notification = session.get(Notification, notification_id)
    if notification and check_bus_status(notification.line):
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

def start_scheduler():
    scheduler = BackgroundScheduler()
    session = next(get_session())
    notifications = session.query(Notification).all()
    for notification in notifications:
        scheduler.add_job(
            send_scheduled_email,
            'date',
            run_date=notification.time,
            args=[notification.id]
        )
    scheduler.start()