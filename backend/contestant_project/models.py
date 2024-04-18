from django.db import models


class ContestantProject(models.Model):
    name = models.CharField(max_length=255)
    content = models.JSONField()

    events = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='projects', blank=True)
    users = models.ForeignKey('User', on_delete=models.CASCADE, related_name='users', blank=True)
    evaluations = models.ManyToManyField('Evaluation', related_name='evaluation', blank=True)

    def __str__(self):
        return self.name
