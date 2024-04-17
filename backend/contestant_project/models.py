from django.db import models


class ContestantProject(models.Model):
    name = models.CharField(max_length=255)
    content = models.JSONField()
    # events = models.ManyToManyField('Event', related_name='projects', blank=True)
    # users = models.ManyToManyField('User', related_name='users', blank=True)
    # evaluations = models.ManyToManyField('Evaluation', related_name='evaluation')

    def __str__(self):
        return self.name