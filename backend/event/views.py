from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import DestroyAPIView, CreateAPIView, ListAPIView

from .models import Event
from .serializers import EventSerializer

# Create your views here.
User = get_user_model()


class EventCreateView(CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    # def perform_create(self, serializer):
    # serializer.save(user=self.request.user,)


class DeleteEventView(DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = []  # IsUser?


class UserEventListView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # permission_classes = []

# class EventDetailView(RetrieveAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer
#
#     def get_object(self):
#         event_id = self.kwargs['pk']
#         user = self.request.user
#         return self.get_queryset().filter(id=event_id, user=user).first()

# Get specific Event View --> ListAPIView
