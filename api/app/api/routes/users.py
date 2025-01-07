from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.models import User
from app.crud import get_user_by_id, get_user_by_email
from app.core.db import get_session


router = APIRouter(prefix="/users", tags=["users"])

@router.get("/id={user_id}", response_model=User)
def read_user(user_id: int, session: Session = Depends(get_session)):
    user = get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/username={username}", response_model=User)
def read_user_by_username(username: str, session: Session = Depends(get_session)):
    user = get_user_by_email(session, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user