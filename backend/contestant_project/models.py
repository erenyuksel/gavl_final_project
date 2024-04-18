from django.db import models


class ContestantProject(models.Model):
    name = models.CharField(max_length=255)
    content = models.JSONField()
    users = models.ForeignKey(to='user.User', on_delete=models.CASCADE, related_name='user_projects', blank=True,
                              default=None)
    evaluations = models.ManyToManyField(to='evaluation.Evaluation', related_name='evaluation', blank=True)

    def __str__(self):
        return self.name
