from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.models import User, UserCreate
from app.crud import get_user_by_email, create_user
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
)
from app.core.db import get_session
from authlib.integrations.starlette_client import OAuth
from app.core.config import settings
from starlette.requests import Request
from starlette.config import Config
from starlette.responses import JSONResponse

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=User)
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    if get_user_by_email(session, user_create.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    hashed_password = get_password_hash(user_create.password)
    return create_user(session, user_create.email, hashed_password)

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
    access_token = create_access_token(data={"id": user.id, "email": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

@router.get("/login/google")
async def login_via_google(request: Request):
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/")
async def google_redirect_handler(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get("userinfo")
        if not user_info:
            raise HTTPException(status_code=400, detail="Could not fetch user info")

        access_token = create_access_token(data={"sub": user_info["email"]})
        # access_token = create_access_token(data={"id": user.id, "email": user.email})
        return JSONResponse(content={"access_token": access_token, "user": user_info})
    except Exception as e:
        raise HTTPException(status_code=400, detail="Authentication failed")