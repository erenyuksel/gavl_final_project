from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ContestantProjectSerializer
from .models import ContestantProject
from rest_framework.permissions import IsAuthenticated


class ProjectListCreateView(ListCreateAPIView):
    queryset = ContestantProject.objects.all()
    serializer_class = ContestantProjectSerializer
    permission_classes = [IsAuthenticated]


class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = ContestantProject.objects.all()
    serializer_class = ContestantProjectSerializer
    permission_classes = [IsAuthenticated]
