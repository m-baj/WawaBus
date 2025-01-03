from data_retrieval.api_connector.connect import add_api_key, get_all_bus_locations
from data_retrieval.config import settings
from data_retrieval.database_connector.db import DatabaseConnector
from data_retrieval.data_downloader import load_current_bus_locations


def test_add_api_key():
    url = "http://example.com/loremipsum"
    assert add_api_key(url) == f"http://example.com/loremipsum&apikey={settings.WARSAW_API_KEY}"


def test_get_all_bus_locations():
    data = get_all_bus_locations()
    assert data is not None
    assert "result" in data
    assert data["result"] is not None
    assert len(data["result"]) > 0


def test_create_mongo_connection():
    db = DatabaseConnector()
    assert db is not None
    assert db.get_db() is not None
    db.close_connection()


def test_load_current_bus_locations():
    db = DatabaseConnector()
    collection = db.get_collection()
    current_count = collection.count_documents({})
    load_current_bus_locations(db)
    db.close_connection()
    db = DatabaseConnector()
    collection = db.get_collection()
    assert collection.count_documents({}) > current_count
    db.close_connection()
