from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'created_at', 'updated_at', ]
        read_only_fields = ['user']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # representation['user'] = UserSerializer(instance.user).data
        # update other representations if needed
        return representation
