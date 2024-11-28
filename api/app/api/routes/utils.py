from fastapi import APIRouter

router = APIRouter()


@router.get("/health-check/", tags=["system"])
async def health_check() -> bool:
    return True
