# from django.db import models
#
# class ContestantProject(models.Model):
#     id = models.IntegerField(primary_key=True)
#     name = models.CharField(max_length=255)
#     content = models.JSONField()
#     event = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='contestant_projects')
#     user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='contestant_projects')
#     evaluation = models.ForeignKey('Evaluation', on_delete=models.CASCADE, related_name='contestant_projects')
