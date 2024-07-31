# from django.contrib import admin
# from .models import Course
# from django_ckeditor_5.widgets import CKEditor5Widget
# from django import forms 


# class CourseAdminForm(forms.ModelForm):
#     class Meta:
#         model = Course
#         fields = '__all__'
#         widgets = {
#                     "description": CKEditor5Widget(
#                         attrs={"class": "django_ckeditor_5"}, config_name="extends"
#                     )
#                 } 


# @admin.register(Course)
# class CourseAdmin(admin.ModelAdmin):
#     list_display = ('title','price', 'is_active')
#     search_fields = ('title','description')
#     list_filter = ('is_active',) 
  