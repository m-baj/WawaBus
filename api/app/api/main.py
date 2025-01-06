from fastapi import APIRouter

from app.api.routes import utils, mailsender, notifications


api_router = APIRouter()
api_router.include_router(utils.router, prefix="/utils", tags=["system"])
api_router.include_router(mailsender.router)
api_router.include_router(notifications.router)