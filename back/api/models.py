from django.db import models
from django.contrib.auth.models import User,AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
  email = models.EmailField(verbose_name="email address", max_length=254,unique=True)
  username = models.CharField(max_length=150,unique=True)
  phone = models.CharField(max_length=20,blank=True,null=True,verbose_name="phone number")
  photo = models.ImageField(upload_to="user_photo/", height_field=None, width_field=None, max_length=None,default="user_photo/default.png")
  subscription = models.BooleanField(default=False)
  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ["username"]
  