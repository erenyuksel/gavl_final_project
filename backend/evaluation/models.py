from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Evaluation(models.Model):
    judge = models.ForeignKey(User, on_delete=models.CASCADE)
    json_data_rating = models.JSONField(blank=True, null=True)
    rubrics = models.ManyToManyField(to='evaluation.Rubric', related_name='rubric_evaluations')


class Rubric(models.Model):
    criteria_json = models.JSONField()
