from data_retrieval.data_downloader import load_current_bus_locations
from data_retrieval.database_connector.db import DatabaseConnector
from data_retrieval.config import settings
import logging
from time import sleep
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def main():
    db = DatabaseConnector()
    logger.info("Database connection established")
    while True:
        logger.info("Downloading data")
        load_current_bus_locations(db)
        logger.info("Data successfully downloaded and saved")
        logger.info("Sleeping for %d seconds", settings.HEARTBEAT)
        sleep(settings.HEARTBEAT)

if __name__ == "__main__":
    main()
