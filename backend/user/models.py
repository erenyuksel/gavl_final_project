from django.contrib.auth.models import AbstractUser
from django.db import models


def organisation_directory_path(instance, filename):
    return f'{instance.id}/organisation/{filename}'


class Organisation(models.Model):
    name = models.CharField(verbose_name="organisation_name", max_length=200, unique=True)
    logo = models.ImageField(verbose_name="logo", upload_to=organisation_directory_path, blank=True, null=True)


class UserAuthority(models.Model):
    ROLES = [
        ("Admin", "Admin"),
        ("Organisation Admin", "Organisation Admin"),
        ("Judge", "Judge"),
        ("Contestant", "Contestant")
    ]
    role = models.CharField(max_length=100, choices=ROLES)


def user_directory_path(instance, filename):
    return f'{instance.id}/user/{filename}'


class User(AbstractUser):
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
    user_authority = models.ForeignKey(to=UserAuthority, related_name="user_authority", on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.username



