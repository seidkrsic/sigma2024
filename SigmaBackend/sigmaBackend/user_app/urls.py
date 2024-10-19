from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import register, user_profile, logout, get_profiles, ActivateUserView, CustomTokenObtainPairView, PasswordResetConfirmView, PasswordResetRequestView

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', register, name='register'),
    path('api/profiles/', get_profiles, name="profiles"),
    path('api/profile/', user_profile, name='profile'),
    path('api/logout/', logout, name='logout'),
    path('api/activate/<uidb64>/<token>/', ActivateUserView.as_view(), name='activate'),
    path('api/password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]
