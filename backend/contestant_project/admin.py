from django.contrib import admin
from .models import ContestantProject


@admin.register(ContestantProject)
class ContestantProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'content',)
    # exclude = ('events', 'users', 'evaluations')

