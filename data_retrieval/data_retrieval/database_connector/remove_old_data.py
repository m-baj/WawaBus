from datetime import datetime

from data_retrieval.database_connector.db import DatabaseConnector


def remove_old_entries(db: DatabaseConnector, older_than: datetime):
    collection = db.get_collection()
    collection.delete_many({"timestamp": {"$lt": older_than}})
