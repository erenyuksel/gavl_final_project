# Generated by Django 5.0.3 on 2024-04-19 15:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contestant_project', '0005_alter_contestantproject_evaluations'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contestantproject',
            name='evaluations',
        ),
    ]
