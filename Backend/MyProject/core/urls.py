from django.urls import path
# Core
from .views import * 

# "localhost/api" Views List 
# All the endpoints for the URl

urlpatterns = [
    path('user/details/<int:ids>', UserView.as_view()),
    path('user/username', UserUsernameView.as_view()), # Url to return only the usernames

]