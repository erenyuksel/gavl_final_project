from django.conf import settings
import random
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


class Token(models.Model):
    STATUS = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('outdated', 'Outdated'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    refresh = models.TextField()
    access = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100, choices=STATUS, default='active')


def get_activation_code(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class RegistrationProfile(models.Model):
    CODE_CHOICES = (
        ('RV', 'Registration Validation'),
        ('PR', 'Password Reset'),
    )

    code = models.CharField(default=get_activation_code, max_length=5)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='registration_profile')
    code_type = models.CharField(
        verbose_name='code type',
        max_length=2,
        choices=CODE_CHOICES, default='RV'
    )
    code_used = models.BooleanField(
        verbose_name='code used',
        default=False
    )


@receiver(post_save, sender=User)
def create_registration_profile(sender, instance, **kwargs):
    profile, created = RegistrationProfile.objects.get_or_create(user=instance)
    if created:
        profile.save()
