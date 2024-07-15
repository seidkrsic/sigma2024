

from rest_framework import serializers
from .models import Course 
from user_app.serializers import ProfileSerializer 
from django.conf import settings

class CourseSerializer(serializers.ModelSerializer):
    instructor = ProfileSerializer()
    image_url = serializers.SerializerMethodField() 
    price_per_hour = serializers.SerializerMethodField() 
    class Meta:
        model = Course
        fields = '__all__'  
        read_only_fields = ['created_at', 'updated_at']  

    def get_image_url(self, obj):
        if obj.image:
            return f"{settings.BASE_URL}{obj.image.url}"
        return None

    def get_price_per_hour(self, obj): 
        if obj.price: 
            return f"{round(obj.price/3, 2)}" 
        return None 