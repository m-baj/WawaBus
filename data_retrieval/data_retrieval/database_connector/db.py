from pymongo import MongoClient
from data_retrieval.config import settings


class DatabaseConnector:
    def __init__(self):
        CONNECTION_STRING = f"mongodb://{settings.MONGO_USERNAME}:{settings.MONGO_PASSWORD}@{settings.MONGO_HOST}"
        self.client = MongoClient(CONNECTION_STRING)
        self.db = self.client[settings.MONGO_DATABASE]

    def get_collection(self, collection_name=None):
        if collection_name is None:
            collection_name = settings.MONGO_DATABASE
        return self.db[collection_name]

    def get_db(self):
        return self.db

    def close_connection(self):
        self.client.close()
