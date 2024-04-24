from rest_framework import serializers
from contestant_project.serializers import ContestantProjectSerializer
from .models import Evaluation, Rubric
from user.serializers import UserSerializer, JudgeSerializer


class RubricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rubric
        fields = ["id", "criteria_json"]


class JudgeMixin(serializers.Serializer):
    judge = JudgeSerializer(read_only=True)


class EvaluationSerializer(JudgeMixin, serializers.ModelSerializer):

    class Meta:
        model = Evaluation
        fields = ['id', 'rubrics', 'judge', 'json_data_rating', 'project']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['project'] = ContestantProjectSerializer(instance.project).data
        representation['rubrics'] = RubricSerializer(instance.rubrics, many=True).data
        representation['judge'] = UserSerializer(instance.judge).data
        return representation

    def create(self, validated_data):
        validated_data['judge'] = self.context['request'].user
        return super().create(validated_data)
