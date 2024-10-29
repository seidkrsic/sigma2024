import os
from .base import *

# Get the current environment from the environment variable
env = os.environ.get('DJANGO_ENV')

if env == 'development':
    from .development import *
elif env == 'production':
    from .production import *
else:
    raise ValueError("Invalid value for DJANGO_ENV environment variable")
