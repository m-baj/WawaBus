from fastapi import APIRouter, Body
from typing import Optional

from app.core.location_retriever import get_bus_locations
from app.models import LocationTime

router = APIRouter(prefix="/location", tags=["location"])


@router.post("/")
def get_location(date_time: Optional[LocationTime] = Body(default=None)):
    if date_time:
        return get_bus_locations(date_time.time)
    return get_bus_locations()
