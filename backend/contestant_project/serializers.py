from rest_framework import serializers
from .models import ContestantProject
from event.serializers import EventSerializer
from evaluation.serializers import EvaluationSerializer
from user.serializers import UserSerializer


class ContestantProjectSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    users = UserSerializer(many=True, read_only=True)
    evaluations = EvaluationSerializer(many=True, read_only=True)

    class Meta:
        model = ContestantProject
        fields = ['id', 'name', 'content', 'events', 'users', 'evaluations']
