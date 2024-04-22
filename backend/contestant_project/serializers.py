from rest_framework import serializers
from .models import ContestantProject
from event.serializers import EventSerializer
from user.serializers import UserSerializer


class ContestantProjectSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    contestants = UserSerializer(many=True, read_only=True)

    class Meta:
        model = ContestantProject
        fields = ['id', 'name', 'content', 'events', 'contestants']
