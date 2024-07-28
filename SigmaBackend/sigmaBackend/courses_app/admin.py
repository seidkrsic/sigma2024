from django.contrib import admin
from .models import Course
from django_ckeditor_5.widgets import CKEditor5Widget
from django import forms 


class CourseAdminForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditor5Widget(config_name='extends'))

    class Meta:
        model = Course
        fields = '__all__'



@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'instructor','price', 'is_active')
    search_fields = ('title', 'instructor__profile', 'description')
    list_filter = ('is_active',)