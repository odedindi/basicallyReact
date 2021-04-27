from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['username']
    username = models.CharField(verbose_name='name', max_length=50)
    first_name = models.CharField(verbose_name='first name', max_length=50)
    last_name = models.CharField(verbose_name='last name', max_length=50)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)

    def __str__(self):
        return f' {self.username} {self.email}'
