from django.http import JsonResponse
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Rubric
from .serializers import RubricSerializer
from rest_framework.generics import ListCreateAPIView
from evaluation.serializers import EvaluationSerializer
from django.shortcuts import get_object_or_404
from evaluation.models import Evaluation


class EvaluationListCreateAPIView(ListCreateAPIView):  # GET, POST evaluations
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(judge=self.request.user)


class EvaluationDetailAPIView(RetrieveUpdateDestroyAPIView):  # GET, PATCH, DELETE specific evaluations with id.
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer


class RubricListCreateAPIView(ListCreateAPIView):  # GET, POST rubrics
    queryset = Rubric.objects.all()
    serializer_class = RubricSerializer


class RubricDetailAPIView(RetrieveUpdateDestroyAPIView):  # GET, PATCH, DELETE specific rubric with id.
    queryset = Rubric.objects.all()
    serializer_class = RubricSerializer


class EvaluationsForRubric(ListCreateAPIView):
    serializer_class = EvaluationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, rubric_id, *args, **kwargs):
        rubric = get_object_or_404(Rubric, pk=rubric_id)
        evaluation = Evaluation.objects.filter(rubrics=rubric)
        serializer = self.serializer_class(evaluation, many=True)
        return JsonResponse(serializer.data, safe=False)
