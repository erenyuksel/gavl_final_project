from rest_framework import serializers


from .models import Evaluation, Rubric


class RubricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rubric
        fields = ["id", "criteria_json"]


class EvaluationSerializer(serializers.ModelSerializer):
    rubrics = RubricSerializer(many=True, read_only=True)
    from contestant_project.serializers import ContestantProjectSerializer
    project = ContestantProjectSerializer(read_only=True)

    class Meta:
        model = Evaluation
        fields = ['id', 'rubrics', 'judge', 'json_data_rating', 'project']
        read_only_fields = ['id', 'rubrics', 'judge', 'json_data_rating']
