from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    country = models.CharField(max_length=300, default="0")
    city = models.CharField(max_length=300, default="0")

class Rate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="poster")
    reason = models.CharField(max_length=300, default='')
    rate = models.IntegerField(max_length=5, default=1)
    Longitude = models.CharField(max_length=600, default='')
    Latitude = models.CharField(max_length=600, default='')
    favorite = models.ManyToManyField(User, related_name="favorited_by")

    def __str__(self):
        return f"{self.user}, rated place"
