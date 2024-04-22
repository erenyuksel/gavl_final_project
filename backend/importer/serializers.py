from rest_framework import serializers

from .models import CsvImporter


class CsvImporterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CsvImporter
        fields = '__all__'
