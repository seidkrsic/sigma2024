from .base import *

DEBUG = False

ALLOWED_HOSTS = ['159.89.11.142']

# Production-specific security settings
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True 

CORS_ALLOWED_ORIGINS = [
    "http://159.89.11.142",
    # Add your frontend URL if different
]



# Use environment variables for sensitive settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'sigma_db'),
        'USER': os.environ.get('DB_USER', 'seid'),
        'PASSWORD': os.environ.get('DB_PASSWORD', '123'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
