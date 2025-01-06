from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class MailBody(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    to: List[str] = Field(default=[])
    subject: str
    body: str

class NotificationRequest(BaseModel):
    hour: int = Field(..., ge=0, le=23, description="Godzina powiadomienia (0-23)")
    minute: int = Field(..., ge=0, le=59, description="Minuta powiadomienia (0-59)")
    line: str = Field(..., description="Numer linii autobusowej")
    stop: str = Field(..., description="Nazwa pętli/przystanku")
    email: str = Field(..., description="Adres e-mail użytkownika")

class Notification(SQLModel, table=True):
    id: str = Field(primary_key=True)
    line: str
    stop: str
    email: str
    time: datetime