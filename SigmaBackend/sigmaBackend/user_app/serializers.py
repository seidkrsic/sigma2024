


from .models import Profile, CustomUser
from rest_framework import serializers
from .models import CustomUser
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.urls import reverse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_active:
            raise serializers.ValidationError('Vaš nalog nije aktiviran. Proverite svoj email.')
        return data
    


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
        email = validated_data.get('email')
        # Provera da li email već postoji
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({'error': 'Ovaj email je već u upotrebi.'})

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'], 
            is_active=False  # Korisnik je neaktivan dok ne potvrdi email
        )
        # Slanje emaila za aktivaciju
        self.send_activation_email(user)
        return user

    def send_activation_email(self, user):
        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        activation_link = f"{settings.FRONTEND_URL}/activate/{uid}/{token}/"

        subject = 'Aktivirajte svoj nalog'
        message = f'Pozdrav {user.username},\n\nMolimo vas da kliknete na sledeći link da biste aktivirali svoj nalog:\n{activation_link}\n\nHvala!'
        user.email_user(subject, message)