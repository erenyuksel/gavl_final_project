from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Evaluation(models.Model):
    # project = models.ForeignKey('Project', on_delete=models.CASCADE)
    judge = models.ForeignKey(User, on_delete=models.CASCADE)
    json_data_rating = models.JSONField(blank=True, null=True)
    rubrics = models.ManyToManyField('Rubric', related_name='evaluations')


class Rubric(models.Model):
    criteria_json = models.JSONField()
    # events = models.ManyToManyField(Event, related_name='rubrics')
