from sqlmodel import SQLModel, Field
from pydantic import EmailStr


class Notification(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: EmailStr
    line: str
    stop: str
    time: str