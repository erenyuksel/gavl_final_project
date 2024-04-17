from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['user']  # see what other read only fields later

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # representation['user'] = UserSerializer(instance.user).data
        # update other representations if needed
        return representation
