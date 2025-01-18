import random
import string

from sqlmodel import Session

from app.crud import create_user
from app.models import User


def generate_random_email() -> str:
    domains = ["example.com", "test.com", "sample.org"]
    username_length = 10
    username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=username_length))
    domain = random.choice(domains)
    return f"{username}@{domain}"


def create_random_user(db: Session) -> User:
    return create_user(db, email=generate_random_email(), hashed_password="abc")

