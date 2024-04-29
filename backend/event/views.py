from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from .models import Event
from .serializers import EventSerializer

User = get_user_model()


class EventListCreateView(ListCreateAPIView):
    # queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        if self.request.user.role == 'Organisation Admin':
            # Organisation Admins see events owned by their organisation
            return Event.objects.filter(owner=self.request.user.organisation.id)

        elif self.request.user.role == 'Admin': # Admins see all events
            return Event.objects.all()

        elif self.request.user.role == 'Judge':
            # Judges see events where they are listed as judges
            return Event.objects.filter(judges=self.request.user)


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.organisation)


class EventRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
