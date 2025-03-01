from data_retrieval.data_downloader import load_current_bus_locations
from data_retrieval.database_connector.db import DatabaseConnector
from data_retrieval.config import settings
from data_retrieval.database_connector.remove_old_data import remove_old_entries
from datetime import datetime, timedelta
import logging
from time import sleep
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def main():
    db = DatabaseConnector()
    logger.info("Database connection established")
    while True:
        logger.info("Downloading data")
        try:
            load_current_bus_locations(db)
            logger.info("Data successfully downloaded and saved")

            one_month_ago = datetime.now() - timedelta(days=30)
            remove_old_entries(db, one_month_ago)
            logger.info("Old data removed")
        except Exception as e:
            logger.error("Failed to download data: %s", e)
            logger.info("Sleeping for %d seconds", settings.HEARTBEAT)
            sleep(settings.HEARTBEAT // 4)
        finally:
            logger.info("Sleeping for %d seconds", settings.HEARTBEAT)
            sleep(settings.HEARTBEAT)

if __name__ == "__main__":
    main()
