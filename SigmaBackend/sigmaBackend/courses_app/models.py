from django.db import models
from user_app.models import Profile 
from django_ckeditor_5.fields import CKEditor5Field

class Course(models.Model):
    title = models.CharField(max_length=255)
    short_description = models.CharField(max_length=999) 
    description = CKEditor5Field('Description', config_name='extends')
    instructor = models.ManyToManyField(Profile, null=True, related_name='courses')
    term_choices = [
        ("I polugođe", "I polugođe"), 
        ("II polugođe", "II polugođe")
    ]

    term = models.CharField(max_length=99, choices=term_choices, default="I polugođe") 
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='course_images/', null=True, blank=True, default="seid.webp")
    length = models.CharField(max_length=99, default="12 nedjelja")  
    weekly_hours = models.CharField(max_length=99, default="2x90 min nedjeljno")  
    is_active = models.BooleanField(default=True) 
    # level_choices = [
    #     ('osnovni', 'Osnovni'), 
    #     ('Srednji', 'Srednji'),
    #     ('Napredni', 'Napredni'),
    # ] 
    # level = models.CharField(max_length=20, choices=level_choices, default="osnovni")  

    course_type_choices = [
        ('matematika', 'Matematika'), 
        ('fizika', 'Fizika'), 
    ] 
    course_type = models.CharField(max_length=20, choices=course_type_choices, default="matematika")
    school_choices = [
        ('osnovna škola', 'Osnovna škola'), 
        ('srednja škola', 'Srednja škola'), 
    ] 

    school_type = models.CharField(max_length=20, choices=school_choices, default="osnovna škola")  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return self.title

    
