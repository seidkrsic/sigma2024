from django.contrib import admin
from .models import Course
from ckeditor.widgets import CKEditorWidget
from django import forms

class CourseAdminForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorWidget())

    class Meta:
        model = Course
        fields = '__all__'



@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor','price', 'is_active')
    search_fields = ('title', 'instructor__profile', 'description')
    list_filter = ('is_active',)