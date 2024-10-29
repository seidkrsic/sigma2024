from django.db import models
import uuid 
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True, blank=False, null=False)
    is_active = models.BooleanField(default=False)
    def __str__(self):
        return self.username 

class Profile(models.Model):
    name = models.CharField(max_length=100, default="")
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, blank=True, null=True, related_name="profile") 
    bio = models.TextField(max_length=2000, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    is_professor = models.BooleanField(default=False, blank=True)
    total_points = models.IntegerField(default=0)  # New field
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    phone_number = models.CharField(
        max_length=15, 
        blank=True, 
        validators=[
            RegexValidator(r'^\+?1?\d{9,15}$', 'Phone number must be entered in the format: "+999999999". Up to 15 digits allowed.')
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


    def __str__(self):
        return self.user.username
