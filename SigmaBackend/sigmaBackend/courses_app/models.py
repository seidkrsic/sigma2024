from django.db import models
from user_app.models import Profile 

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    instructor = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, related_name='courses')
    grade_choices = [ 
        ('6-7', "6-7"), 
        ('6-8', "6-8"), 
        ('7-9', "7-9"),
        ("srednja škola", "Srednja Škola") 
    ]
    term_choices = [
        ("zimski", "Zimski"), 
        ("ljetnji", "Ljetnji")
    ]
    grade = models.CharField(max_length=99, choices=grade_choices, default="6-7") 
    term = models.CharField(max_length=99, choices=term_choices, default="zimski") 
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='course_images/', null=True, blank=True, default="seid.webp")
    length = models.CharField(max_length=99, default="12 nedelja")  
    weekly_hours = models.CharField(max_length=99, default="3 sata nedeljno")  
    is_active = models.BooleanField(default=True) 
    level_choices = [
        ('osnovni', 'Osnovni'), 
        ('Srednji', 'Srednji'),
        ('Napredni', 'Napredni'),
    ] 
    level = models.CharField(max_length=20, choices=level_choices, default="osnovni")  

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

    
