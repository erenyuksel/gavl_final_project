from django.db import models
from django.conf import settings


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
