# Generated by Django 5.0.3 on 2024-04-22 12:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contestant_project', '0002_initial'),
        ('evaluation', '0002_initial'),
        ('event', '0001_initial'),
        ('user', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='judges',
            field=models.ManyToManyField(blank=True, related_name='event_judges', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='organisation_admin', to='user.organisation'),
        ),
        migrations.AddField(
            model_name='event',
            name='projects',
            field=models.ManyToManyField(blank=True, related_name='event_projects', to='contestant_project.contestantproject'),
        ),
        migrations.AddField(
            model_name='event',
            name='rubrics',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rubric_event', to='evaluation.rubric'),
        ),
        migrations.AddField(
            model_name='event',
            name='sponsors',
            field=models.ManyToManyField(blank=True, related_name='sponsored_event', to='user.organisation'),
        ),
    ]
