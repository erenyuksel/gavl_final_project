from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from .models import Evaluation, Rubric
from .serializers import EvaluationSerializer, RubricSerializer

from rest_framework.generics import ListCreateAPIView
from .models import Evaluation
from .serializers import EvaluationSerializer


class EvaluationListCreateAPIView(ListCreateAPIView):  # GET, POST evaluations
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

    # permission_classes = [IsAuthenticated]


class EvaluationDetailAPIView(RetrieveUpdateDestroyAPIView):  # GET, PATCH, DELETE specific evaluations with id.
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer


class RubricListCreateAPIView(ListCreateAPIView):  # GET, POST rubrics
    queryset = Rubric.objects.all()
    serializer_class = RubricSerializer


class RubricDetailAPIView(RetrieveUpdateDestroyAPIView):  # GET, PATCH, DELETE specific rubric with id.
    queryset = Rubric.objects.all()
    serializer_class = EvaluationSerializer
