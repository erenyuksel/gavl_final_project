from django.contrib.auth.models import AbstractUser
from django.db import models


def organisation_directory_path(instance, filename):
    return f'organisation/{instance.name}/{filename}'


class Organisation(models.Model):
    name = models.CharField(verbose_name="organisation_name", max_length=200)
    logo = models.ImageField(verbose_name="logo", upload_to=organisation_directory_path, blank=True, null=True)


def user_directory_path(instance, filename):
    return f'user/{instance.username}/{filename}'


class User(AbstractUser):
    ROLES = [
        ("Admin", "Admin"),
        ("Organisation Admin", "Organisation Admin"),
        ("Judge", "Judge"),
        ("Contestant", "Contestant")
    ]

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    username = models.CharField(verbose_name='username', max_length=200, unique=True)
    first_name = models.CharField(verbose_name='first name', max_length=200, blank=True)
    last_name = models.CharField(verbose_name='last name', max_length=200, blank=True)
    created_date = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    avatar = models.ImageField(verbose_name='picture', upload_to=user_directory_path, blank=True, null=True)
    organisation = models.ForeignKey(to=Organisation, related_name="user_of_organisation", on_delete=models.DO_NOTHING,
                                     blank=True, null=True)
    role = models.CharField(max_length=100, choices=ROLES, blank=True)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.pk:  # Check if this is a new instance
            if self.role == 'Judge':
                self.is_active = False  # Set judge default is_active to False
        super().save(*args, **kwargs)
