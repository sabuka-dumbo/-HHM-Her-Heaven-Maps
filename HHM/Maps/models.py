from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    country = models.CharField(max_length=300, default="0")
    city = models.CharField(max_length=300, default="0")

class Rate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="poster")
    rate = models.CharField(max_length=300)
    place = models.CharField(max_length=600)

    def __str__(self):
        return f"{self.user}, rated place"
