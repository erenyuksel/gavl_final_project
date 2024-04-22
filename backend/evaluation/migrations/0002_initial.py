# Generated by Django 5.0.3 on 2024-04-22 12:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contestant_project', '0002_initial'),
        ('evaluation', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='evaluation',
            name='judge',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='evaluation',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contestant_project.contestantproject'),
        ),
        migrations.AddField(
            model_name='evaluation',
            name='rubrics',
            field=models.ManyToManyField(related_name='rubric_evaluations', to='evaluation.rubric'),
        ),
    ]
