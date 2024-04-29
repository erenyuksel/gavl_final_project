# Generated by Django 5.0.3 on 2024-04-25 14:51

import registration.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RegistrationProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=registration.models.get_activation_code, max_length=5)),
                ('code_type', models.CharField(choices=[('RV', 'Registration Validation'), ('PR', 'Password Reset')], default='RV', max_length=2, verbose_name='code type')),
                ('code_used', models.BooleanField(default=False, verbose_name='code used')),
            ],
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('refresh', models.TextField()),
                ('access', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive'), ('outdated', 'Outdated')], default='active', max_length=100)),
            ],
        ),
    ]
