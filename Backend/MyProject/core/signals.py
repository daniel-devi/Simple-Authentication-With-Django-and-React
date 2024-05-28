from django.db.models.signals import post_save, pre_save,pre_delete
from django.dispatch import receiver
from django.utils import timezone
# Core
from .models import User,UserProfile
# External library
import uuid
import os
from datetime import timedelta, date

# Create Your Signals Here 


# Creates a UserProfile Once a UserModel is Created
@receiver(post_save, sender=User) 
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)     

# Connects Signals to the Model      
post_save.connect(create_user_profile, sender=User)



# Delete UserProfile From Database On Delete
@receiver(pre_delete, sender=UserProfile) 
def delete_user_profile(sender, instance, **kwargs):
    # Function to Delete File From Database
    def delete_file(file_path):
        if os.path.exists(file_path):
            os.remove(file_path)
    if instance.profile_picture:       
        file_path = instance.profile_picture.path
        delete_file(file_path)


# Connects Signals to the Model      
pre_delete.connect(delete_user_profile, sender=UserProfile)



