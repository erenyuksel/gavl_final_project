from rest_framework import serializers
from .models import Event
from contestant_project.serializers import ContestantProjectSerializer


class EventSerializer(serializers.ModelSerializer):
    projects = ContestantProjectSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = ['id', 'name', 'rubrics', 'start_date', 'end_date', 'projects', 'owner', 'sponsors', 'description',
                  'project_file_structure', 'judges', 'created_at', 'updated_at', ]
