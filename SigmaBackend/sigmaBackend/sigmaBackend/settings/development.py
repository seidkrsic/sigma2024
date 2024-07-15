from .base import *



DEBUG = True

ALLOWED_HOSTS = ["*"]  

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",


    # Add your frontend URL if different
]

INTERNAL_IPS = [
    '127.0.0.1',
]
