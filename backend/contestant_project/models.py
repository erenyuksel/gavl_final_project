from django.db import models


class ContestantProject(models.Model):
    name = models.CharField(max_length=255)
    content = models.JSONField()
    contestants = models.ManyToManyField(to='user.User', related_name='user_projects', blank=True)

    def __str__(self):
        return self.name
