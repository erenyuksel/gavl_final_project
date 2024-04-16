from rest_framework import serializers
from .models import Evaluation, Rubric


class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = '__all__'  # You can specify fields you want to include in the API response here


class RubricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rubric
        fields = '__all__'
