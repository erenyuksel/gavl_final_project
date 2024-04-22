from django.db import models


def project_directory_path(instance, filename):
    return f'project/{instance.name}/{filename}'


class ContestantProject(models.Model):
    name = models.CharField(max_length=255)
    content = models.JSONField()
    description = models.TextField(blank=True)
    project_logo = models.ImageField(verbose_name="logo", upload_to=project_directory_path, blank=True, null=True)
    contestants = models.ManyToManyField(to='user.User', related_name='user_projects', blank=True)

    def __str__(self):
        return self.name
