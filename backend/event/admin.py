from django.contrib import admin
from .models import Event


# Register your models here.
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'start_date', 'end_date', 'description', 'created_at', 'updated_at')
    search_fields = ('name', 'description',)

    # 'projects', 'owner', 'sponsors', 'rubrics', 'judges',
