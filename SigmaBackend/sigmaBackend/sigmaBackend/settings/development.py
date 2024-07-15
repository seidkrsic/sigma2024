from .base import *
from decouple import config


DEBUG = True

ALLOWED_HOSTS = ["*"]  

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",


    # Add your frontend URL if different
]


INTERNAL_IPS = [
    '127.0.0.1',
]

DJANGO_ENV = config("DJANGO_ENV")