from django.db import models
from typing import Iterable
from django.contrib.auth.models import User
from django.utils import timezone
# importing uuid 
import uuid 
# Import from Pillow
from PIL import Image
# Create your models here.

# UserProfileLink Tree Model
class UserProfileLink(models.Model):
    name = models.CharField(max_length=450, blank=True, null=True)
    link_url = models.URLField(max_length=200)
    
    # Return the Name of Each Object as the name
    def __str__(self):
        return f"{self.name}"

# A UserProfile Model
def user_profile_image_directory_path(instance, filename): # Profile Save Directory
    # file will be uploaded to MEDIA_ROOT/user_name/<filename>
    return f"Profile-Images/user_{instance.user.username}/{filename}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to=user_profile_image_directory_path, null=True, blank=True)
    #, default='default/image.png',
    bio = models.CharField(max_length=450, blank=True, null=True)
    friends = models.ManyToManyField(User, blank=True, related_name="UserProfileFriends")
    description = models.CharField(max_length=10000, blank=True, null=True)
    link_tree = models.ManyToManyField(UserProfileLink, blank=True)

    # Return the Name of Each Object as {User-Username} Profile
    def __str__(self):
        return f"{self.user} Profile"
 
    def save(self, *args, **kwargs):
        # save the profile first
        super().save(*args, **kwargs)
        
        if self.profile_picture : # Checks if there is a Profile Picture First
            # resize the image
            img = Image.open(self.profile_picture.path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                # create a thumbnail
                img.thumbnail(output_size)
                # overwrite the larger image
                img.save(self.profile_picture.path)
                
            
