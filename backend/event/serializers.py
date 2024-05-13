from rest_framework import serializers
from .models import Event
from contestant_project.serializers import ContestantProjectSerializer
from user.serializers import JudgeSerializer


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ['id', 'name', 'rubrics', 'start_date', 'end_date', 'projects', 'owner', 'sponsors', 'description',
                  'project_file_structure', 'judges', 'created_at', 'updated_at', ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['projects'] = ContestantProjectSerializer(instance.projects, many=True).data
        representation['judges'] = JudgeSerializer(instance.judges, many=True).data
        return representation
