from django.contrib.auth import get_user_model
from django.db import models
from contestant_project.models import ContestantProject
from evaluation.models import Evaluation
from user.models import Organisation

User = get_user_model()

class Event(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # rubrics = models.ManyToManyField(to=Evaluation, related_name='events', blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    projects = models.ManyToManyField(to=ContestantProject, related_name='event_projects', blank=True, many=True)
    # owner = models.ForeignKey(to=Organisation, on_delete=models.CASCADE, related_name='organisation_admin', blank=True, null=True)
    # sponsors = models.ManyToManyField(to=Organisation, related_name='sponsored_events', blank=True)
    description = models.TextField()
    project_file_structure = models.JSONField()
    # judges = models.ManyToManyField(to=User, related_name='event_judges', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
