from django.shortcuts import render
from rest_framework import viewsets,generics
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import UserSerializer,RegisterSerializer

User = get_user_model()

# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [IsAdminUser]

class Userself(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return self.request.user
  
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer