from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import register, user_profile, logout, get_profiles

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register, name='register'),
    path('api/profiles/', get_profiles, name="profiles"),
    path('api/profile/', user_profile, name='profile'),
    path('api/logout/', logout, name='logout'),
]