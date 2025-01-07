from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.models import User
from app.crud import get_user_by_email, create_user
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
)
from app.core.db import get_session

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=User)
def register(
    email: str,
    password: str,
    session: Session = Depends(get_session),
):
    if get_user_by_email(session, email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    hashed_password = get_password_hash(password)
    return create_user(session, email, hashed_password)

@router.post("/login")
def login(
    email: str,
    password: str,
    session: Session = Depends(get_session),
):
    user = get_user_by_email(session, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
