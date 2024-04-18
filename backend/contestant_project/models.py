from django.db import models


# from event.models import Event
# from evaluation.models import Evaluation


class ContestantProject(models.Model):
    name = models.CharField(max_length=255)
    content = models.JSONField()

    # events = models.ForeignKey(to=Event, on_delete=models.CASCADE, related_name='projects', blank=True)
    # users = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='users', blank=True)
    # evaluations = models.ManyToManyField(to=Evaluation, related_name='evaluation', blank=True)

    def __str__(self):
        return self.name
