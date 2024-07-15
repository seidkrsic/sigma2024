

from rest_framework import serializers
from .models import Profile, CustomUser
from django.conf import settings 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    image_url = serializers.SerializerMethodField() 
    class Meta:
        model = Profile
        fields = "__all__" 

    def get_image_url(self, obj):
        if obj.profile_picture:
            return f"{settings.BASE_URL}{obj.profile_picture.url}"
        return None


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
