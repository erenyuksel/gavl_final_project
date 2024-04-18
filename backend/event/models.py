from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=100, unique=True)
    rubrics = models.ForeignKey(to='evaluation.Rubric', on_delete=models.CASCADE, related_name='rubric_event',
                                blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    projects = models.ManyToManyField(to='contestant_project.ContestantProject', related_name='event_projects',
                                      blank=True, )
    owner = models.ForeignKey(to='user.Organisation', on_delete=models.DO_NOTHING, related_name='organisation_admin',
                              blank=True, null=True)
    sponsors = models.ManyToManyField(to='user.Organisation', related_name='sponsored_event', blank=True)
    description = models.TextField()
    project_file_structure = models.JSONField(null=True, blank=True)
    judges = models.ManyToManyField(to='user.User', related_name='event_judges', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
