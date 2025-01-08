from datetime import datetime, timedelta
from pymongo import MongoClient
from data_retrieval.config import settings

def check_bus_status(line: str) -> bool:
    client = MongoClient(f"mongodb://{settings.MONGO_USERNAME}:{settings.MONGO_PASSWORD}@{settings.MONGO_HOST}")
    db = client[settings.MONGO_DATABASE]
    collection = db.get_collection()

    current_time = datetime.now()

    bus_data = collection.find({"Lines": line}).sort("Time", -1).limit(1)

    if bus_data:
        last_movement_time = datetime.strptime(bus_data[0]["Time"], "%Y-%m-%d %H:%M:%S")
        if current_time - last_movement_time <= timedelta(minutes=2):
            return True

    return False