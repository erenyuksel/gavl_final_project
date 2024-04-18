from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'rubrics', 'start_date', 'end_date', 'projects', 'owner', 'sponsors', 'description',
                  'project_file_structure', 'judges', 'created_at', 'updated_at', ]
