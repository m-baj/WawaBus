from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import List, Optional


class MailBody(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    to: List[str] = Field(default=[])
    subject: str
    body: str
