from pydantic_settings import BaseSettings


class Config(BaseSettings):
    WARSAW_API_URL: str
    WARSAW_API_KEY: str
    MONGO_USERNAME: str
    MONGO_PASSWORD: str
    MONGO_DATABASE: str
    MONGO_HOST: str
    HEARTBEAT: int


settings = Config()
