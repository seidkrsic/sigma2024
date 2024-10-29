from django.contrib import admin
from .models import Course, Problem, Solution, Post 
from django_ckeditor_5.widgets import CKEditor5Widget
from django import forms 


admin.site.register(Problem)
admin.site.register(Solution)
admin.site.register(Post) 

class CourseAdminForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = '__all__'
        widgets = {
                    "description": CKEditor5Widget(
                        attrs={"class": "django_ckeditor_5"}, config_name="extends"
                    )
                } 


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title','price', 'is_active')
    search_fields = ('title','description')
    list_filter = ('is_active',) 
  