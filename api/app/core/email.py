import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from ssl import create_default_context
from time import sleep
from app.core.config import settings
from app.models import MailBody


def send_email(data: dict | None = None):
    msg = MailBody(**data)

    # Przygotowanie wiadomości
    message = MIMEMultipart("alternative")
    message["From"] = settings.SMTP_config["user"]
    message["To"] = ", ".join(msg.to)
    message["Subject"] = msg.subject

    part = MIMEText(msg.body, "html")
    message.attach(part)

    ctx = create_default_context()

    try:
        with smtplib.SMTP(settings.SMTP_config["host"], settings.SMTP_config["port"]) as server:
            server.ehlo()
            if settings.SMTP_config["tls"]:
                server.starttls(context=ctx)
            server.ehlo()
            server.login(settings.SMTP_config["user"], settings.SMTP_config["password"])
            server.sendmail(settings.SMTP_config["user"], msg.to, message.as_string())
        return {"status": 200, "errors": None}
    except Exception as e:
        return {"status": 500, "errors": str(e)}


# def schedule_notification(email: str, line: str, stop: str, time: str):
#     notification_time = datetime.strptime(time, "%H:%M")
#     current_time = datetime.now()
#
#     if notification_time < current_time:
#         notification_time += timedelta(days=1)
#
#     wait_time = (notification_time - current_time).total_seconds()
#     sleep(wait_time)
#
#     subject = f"Notification for line {line}"
#     body = f"The bus for line {line} is scheduled to leave from {stop} at {time}."
#     send_email(email, subject, body)
