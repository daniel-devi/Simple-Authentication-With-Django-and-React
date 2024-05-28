from django.shortcuts import render
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework.generics import ListAPIView
# Core
from .serializer import *
from .models import *
# Restframework
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.http import Http404, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# Create your views here.


# Create New User View
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

# UserModel objects Details View
class UserView(generics.ListAPIView):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        search_name = self.kwargs['ids']
        return User.objects.filter(id__icontains=search_name)
    
# UserModel Username objects List View
class UserUsernameView(ListAPIView):
    serializer_class = UsernameSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    
# Update UserModel objects View
class UpdateUserView(generics.UpdateAPIView):

    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer    
