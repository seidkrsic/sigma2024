from django.contrib import admin
from .models import Course



@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor','price', 'is_active')
    search_fields = ('title', 'instructor__profile', 'description', "grade")
    list_filter = ('is_active', 'level', "grade")
    ordering = ('grade',)