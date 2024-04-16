from django.contrib import admin
from backend.event.models import Event


# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
    'name', 'rubrics', 'start_date', 'end_date', 'description', 'projects', 'owner', 'sponsors', 'description',
    'judges', 'created_at', 'updated_at')
    search_fields = ()
