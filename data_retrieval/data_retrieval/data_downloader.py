from data_retrieval.database_connector.db import DatabaseConnector
from data_retrieval.api_connector.connect import get_all_bus_locations
from datetime import datetime

def load_current_bus_locations(db: DatabaseConnector):
    data = get_all_bus_locations()
    collection = db.get_collection()

    data["timestamp"] = datetime.now()
    collection.insert_one(data)