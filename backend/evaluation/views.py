from rest_framework.generics import RetrieveUpdateDestroyAPIView

from .models import Evaluation, Rubric
from .serializers import RubricSerializer

from rest_framework.generics import ListCreateAPIView

from .serializers import EvaluationSerializer


class EvaluationListCreateAPIView(ListCreateAPIView):  # GET, POST evaluations
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

    # permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        # Access the authenticated user who sent the request
        judge = self.request.user
        # Assign the judge to the evaluation object before saving
        serializer.save(judge=judge)

    def create(self, request, *args, **kwargs):
        # Create the evaluation object using perform_create
        response = super().create(request, *args, **kwargs)
        return response


class EvaluationDetailAPIView(RetrieveUpdateDestroyAPIView):  # GET, PATCH, DELETE specific evaluations with id.
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer


class RubricListCreateAPIView(ListCreateAPIView):  # GET, POST rubrics
    queryset = Rubric.objects.all()
    serializer_class = RubricSerializer


class RubricDetailAPIView(RetrieveUpdateDestroyAPIView):  # GET, PATCH, DELETE specific rubric with id.
    queryset = Rubric.objects.all()
    serializer_class = EvaluationSerializer
