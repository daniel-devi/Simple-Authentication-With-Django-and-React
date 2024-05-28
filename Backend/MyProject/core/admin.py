from django.contrib import admin
# Core
from core.models import *
# Register your models here.

# Register Models to the Admin Panel
admin.site.register(UserProfile)
admin.site.register(UserProfileLink)
