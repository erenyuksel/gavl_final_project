from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Event(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # rubrics = models.ManyToManyField('Rubric', related_name='events')
    start_date = models.DateField()
    end_date = models.DateField()
    # projects = models.ManyToManyField('ContestantProject', related_name='events')
    owner = models.ForeignKey('Organization', on_delete=models.CASCADE, related_name='owned_events')
    # sponsors = models.ManyToManyField('Organization', related_name='sponsored_events')
    description = models.TextField()
    # judges = models.ManyToManyField('User', related_name='judged_events')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
