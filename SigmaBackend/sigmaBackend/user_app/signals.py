from django.db.models.signals import post_save, post_delete

from django.dispatch import receiver
from .models import Profile, CustomUser


@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(post_delete, sender=Profile)
def delete_user_profile(sender, instance, **kwargs): 
    try: 
        user = instance.user 
        user.delete()   
    except: 
        pass 

    