from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ContestantProjectSerializer
from .models import ContestantProject
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from event.serializers import EventSerializer
from django.http import JsonResponse
from event.models import Event
from evaluation.serializers import EvaluationSerializer
from evaluation.models import Evaluation


class ProjectListCreateView(ListCreateAPIView):
    queryset = ContestantProject.objects.all()
    serializer_class = ContestantProjectSerializer
    permission_classes = [IsAuthenticated]


class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = ContestantProject.objects.all()
    serializer_class = ContestantProjectSerializer
    permission_classes = [IsAuthenticated]


class EventsForProjectView(ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id, *args, **kwargs):
        project = get_object_or_404(ContestantProject, pk=project_id)
        events = Event.objects.filter(projects=project)
        serializer = self.serializer_class(events, many=True)
        return JsonResponse(serializer.data, safe=False)


class EvaluationsForProjectView(ListCreateAPIView):
    serializer_class = EvaluationSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id, *args, **kwargs):
        project = get_object_or_404(ContestantProject, pk=project_id)
        evaluation = Evaluation.objects.filter(project=project)
        serializer = self.serializer_class(evaluation, many=True)
        return JsonResponse(serializer.data, safe=False)
