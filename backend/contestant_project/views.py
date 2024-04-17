from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ContestantProjectSerializer
from .models import ContestantProject
from rest_framework.permissions import IsAuthenticated

class ProjectListView(ListAPIView):
    queryset = ContestantProject.objects.all()
    serializer_class = ContestantProjectSerializer
    permission_classes = [IsAuthenticated]

class ProjectCreateView(CreateAPIView):
    queryset = ContestantProject.objects.all()
    serializer_class = ContestantProjectSerializer
    permission_classes = [IsAuthenticated]

class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = ContestantProject.objects.all()
    serializer_class = ContestantProjectSerializer
    permission_classes = [IsAuthenticated]