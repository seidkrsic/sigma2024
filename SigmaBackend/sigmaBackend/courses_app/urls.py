from django.urls import path
from . import views

urlpatterns = [
    path('api/courses/', views.get_all_courses, name='get_all_courses'),
    path('api/courses/<int:id>/', views.get_course, name='get_course'),
    path('api/courses/search/', views.search_courses_by_category, name='search_courses_by_category'),
]
