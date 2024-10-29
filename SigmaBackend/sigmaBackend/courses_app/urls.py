from django.urls import path
from . import views

urlpatterns = [
    path('api/courses/', views.get_all_courses, name='get_all_courses'),
    path('api/courses/<int:id>/', views.get_course, name='get_course'),
    path('api/courses/search/', views.search_courses_by_category, name='search_courses_by_category'),

    path('api/problem-of-the-week/', views.current_problem, name='current_problem'),
    path('api/submit-solution/', views.submit_solution, name='submit_solution'),
    path('api/problem-file/<int:pk>/', views.problem_file, name='problem_file'),
    path('api/problems/', views.problem_list, name='problem_list'),
    path('api/problem-solution-file/<int:pk>/', views.problem_solution_file, name='problem_solution_file'),

    path('api/posts/', views.post_list_create, name='post-list-create'),
    path('api/posts/<slug:slug>/', views.post_detail, name='post-detail'),

    path('api/rankings/weekly/', views.weekly_rankings, name='weekly_rankings'),
    path('api/rankings/monthly/', views.monthly_rankings, name='monthly_rankings'),
    path('api/rankings/all-time/', views.all_time_rankings, name='all_time_rankings'),

]
