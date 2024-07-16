from .base import *
# Use environment variables for sensitive settings
from decouple import config
DEBUG = False

ALLOWED_HOSTS = ['159.89.11.142', "localhost", "*"]

# Production-specific security settings


SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True



CORS_ALLOWED_ORIGINS = [
    "http://159.89.11.142",
    
    # Add your frontend URL if different
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}

SECRET_KEY = config('DJANGO_SECRET_KEY')
DJANGO_ENV = config("DJANGO_ENV")
BASE_URL = 'http://159.89.11.142' 