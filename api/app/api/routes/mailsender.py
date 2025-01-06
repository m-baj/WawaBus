from fastapi import APIRouter, BackgroundTasks
from app.models import MailBody
from app.core.email import send_email

router = APIRouter(prefix="/mailsender", tags=["mailsender"])

@router.get("/")
def get_mailsender():
    return {"status": "fastapi mailserver is running"}

@router.post("/send-email")
def schedule_mail( req:MailBody,tasks: BackgroundTasks):
    data = req.dict()
    tasks.add_task(send_email, data)
    return {"status": 200, "message": "Email has been scheduled"}



