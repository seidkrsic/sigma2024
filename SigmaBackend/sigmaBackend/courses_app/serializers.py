

from rest_framework import serializers
from .models import Course, Problem, Solution 
from user_app.serializers import ProfileSerializer 
from django.conf import settings
from django.urls import reverse 
from .models import Post



class RankingSerializer(serializers.Serializer):
    username = serializers.CharField(source='profile__user__username')
    name = serializers.CharField(source='profile__name')
    profile_picture = serializers.SerializerMethodField()
    total_points = serializers.IntegerField()
    total_time = serializers.FloatField()  # Novo polje

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        profile_picture = obj.get('profile__profile_picture')
        if profile_picture:
            return request.build_absolute_uri(settings.MEDIA_URL + profile_picture)
        return None


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.user.username')

    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'content', 'main_image', 'created_date', 'published_date', 'slug']



class ProblemSerializer(serializers.ModelSerializer):
    problem_file_url = serializers.SerializerMethodField()
    solution_file_url = serializers.SerializerMethodField()  # Dodato polje

    class Meta:
        model = Problem
        fields = ['id', 'title', 'problem_file_url', 'solution_file_url', 'published_date']

    def get_problem_file_url(self, obj):
        request = self.context.get('request')
        if obj.problem_file:
            file_url = reverse('problem_file', args=[obj.pk])
            return request.build_absolute_uri(file_url)
        return None
    
    def get_solution_file_url(self, obj):
        request = self.context.get('request')
        if obj.solution_file:
            file_url = reverse('problem_solution_file', args=[obj.pk])
            return request.build_absolute_uri(file_url)
        return None


# serializers.py

class SolutionSerializer(serializers.ModelSerializer):
    solution_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Solution
        fields = [
            'id', 'profile', 'problem', 'submitted_solution',
            'submission_date', 'is_correct', 'solution_file_url', "time_taken"
        ]
        read_only_fields = ['profile', 'submission_date', 'is_correct', 'solution_file_url', "time_taken"]

    def get_solution_file_url(self, obj):
        request = self.context.get('request')
        if obj.solution_file:
            file_url = reverse('solution_file', args=[obj.pk])
            return request.build_absolute_uri(file_url)
        return None

    def create(self, validated_data):
        profile = self.context['request'].user.profile  
        problem = validated_data['problem']
        submitted_solution = validated_data['submitted_solution']

        # Provera da li je rešenje tačno
        is_correct = False
        if problem.solution is not None:
            is_correct = (submitted_solution == problem.solution)

        solution = Solution.objects.create(
            profile=profile,
            problem=problem,
            submitted_solution=submitted_solution,
            is_correct=is_correct
        )
        return solution




class CourseSerializer(serializers.ModelSerializer):
    instructor = ProfileSerializer(many=True)
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
            return f"7.50" 
        return None 