from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import DestroyAPIView, CreateAPIView, ListAPIView

from backend.event.models import Event
from backend.event.permissions import IsAuthor
from backend.event.serializers import EventSerializer

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
    serializer_class = EventSerializer
    permission_classes = []

    def get_queryset(self):
        user = User.objects.get(id=self.kwarfs['user_id'])
        return Event.objects.filter(user=user)

# Get specific Event View --> ListAPIView
