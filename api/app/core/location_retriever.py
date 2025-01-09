from app.core.db import nosql_collection
from datetime import datetime
from typing import Union


def get_bus_locations(date_time: Union[datetime, None] = None):
    collection = nosql_collection()

    if not date_time:
        data = collection.find_one(sort=[("timestamp", -1)])
        data.pop('_id', None)
        return data

    start_time = date_time.replace(second=0, microsecond=0)
    end_time = date_time.replace(second=59, microsecond=999999)
    query = {"timestamp": {"$gte": start_time, "$lte": end_time}}

    return collection.find_one(query, {"_id": 0})
