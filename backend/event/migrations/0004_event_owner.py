# Generated by Django 5.0.3 on 2024-04-18 12:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0003_event_sponsors'),
        ('user', '0002_remove_organisation_sponsored_event'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='organisation_admin', to='user.organisation'),
        ),
    ]
