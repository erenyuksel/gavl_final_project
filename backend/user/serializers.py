from django.contrib.auth import get_user_model
from rest_framework import serializers

from user.models import Organisation

User = get_user_model()


class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = ['id', 'name', 'logo']


class UserSerializer(serializers.ModelSerializer):
    # organisation = OrganisationSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'avatar', 'organisation']
        # read_only_fields = ['email']

    # it helps to have judge without organisation
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['organisation'] = OrganisationSerializer(instance.organisation).data
        return representation

    # to be possible patch organisation too
    def update(self, instance, validated_data):
        organisation_data = validated_data.pop('organisation', None)

        # Update user instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update organisation if necessary
        if organisation_data:
            organisation = instance.organisation
            for attr, value in organisation_data.items():
                setattr(organisation, attr, value)
            organisation.save()

        return instance
