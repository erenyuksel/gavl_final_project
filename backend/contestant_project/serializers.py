from rest_framework import serializers
from .models import ContestantProject
from user.serializers import UserSerializer


class ContestantProjectSerializer(serializers.ModelSerializer):
    contestants = UserSerializer(many=True, read_only=True)

    class Meta:
        model = ContestantProject
        fields = ['id', 'name', 'content', 'contestants']
