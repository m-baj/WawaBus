from fastapi import APIRouter

from app.api.routes import utils
from app.api.routes import mailsender


api_router = APIRouter()
api_router.include_router(utils.router, prefix="/utils", tags=["system"])
api_router.include_router(mailsender.router)