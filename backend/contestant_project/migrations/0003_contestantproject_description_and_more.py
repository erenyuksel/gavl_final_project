# Generated by Django 5.0.3 on 2024-04-22 13:07

import contestant_project.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contestant_project', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contestantproject',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='contestantproject',
            name='project_logo',
            field=models.ImageField(blank=True, null=True, upload_to=contestant_project.models.project_directory_path, verbose_name='logo'),
        ),
    ]
