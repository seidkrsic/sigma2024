from django.db import models
from user_app.models import Profile 
from django_ckeditor_5.fields import CKEditor5Field
from django.utils import timezone 


class Course(models.Model):
    title = models.CharField(max_length=255)
    short_description = models.CharField(max_length=999, null=True)  
    description = CKEditor5Field('Description', config_name='extends')
    instructor = models.ManyToManyField(Profile, related_name='courses')
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
    course_url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return self.title

    

class Problem(models.Model):
    title = models.CharField(max_length=255)
    problem_file = models.FileField(upload_to='problems/')
    published_date = models.DateField()
    points = models.IntegerField(default=10)  # Default points for the problem
    is_active = models.BooleanField(default=False)
    solution_file = models.FileField(upload_to='solutions/', blank=True, null=True)  # Dodato polje
    solution = models.IntegerField(blank=True, null=True)  # Tačno rešenje (integer)

    def __str__(self):
        return self.title
    

class Solution(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE, related_name='solutions' )
    submitted_solution = models.IntegerField()
    submission_date = models.DateTimeField(auto_now_add=True)
    is_correct = models.BooleanField(default=False)
    points_awarded = models.IntegerField(default=0)  # New field


    def __str__(self):
        return f'Rešenje od {self.profile.user.username} za {self.problem.title}'




class ProblemSession(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'Sesija od {self.profile.user.username} za {self.problem.title}'




class Post(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    main_image = models.ImageField(upload_to='blog_images/', null=True, blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    slug = models.SlugField(unique=True, max_length=200)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title


