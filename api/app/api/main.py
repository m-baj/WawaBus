from fastapi import APIRouter

from app.api.routes import utils, mailsender, notifications, auth, users


api_router = APIRouter()
api_router.include_router(utils.router, prefix="/utils", tags=["system"])
api_router.include_router(mailsender.router)
api_router.include_router(notifications.router)
api_router.include_router(auth.router)
api_router.include_router(users.router)