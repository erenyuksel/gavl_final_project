from django.contrib.auth import get_user_model
# from django.utils.decorators import method_decorator
# from django.views import View
from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .utils import duplicate_entity
from django.http import JsonResponse

from .models import Event
from .serializers import EventSerializer

User = get_user_model()


@csrf_exempt
def duplicate_event(request, event_id):
    new_event = duplicate_entity('Event', event_id)
    if new_event:
        print(new_event)
        return JsonResponse({'status': 'success', 'data': new_event.id})
    else:
        return JsonResponse({'status': 'error', 'message': 'Event not found'}, status=404)


# @method_decorator(csrf_exempt, name='dispatch')
# class DuplicateEventView(View):
    # @method_decorator(require_POST)
    # def dispatch(self, request, *args, **kwargs):
    #     super(DuplicateEventView, self).dispatch(request, *args, **kwargs)

    # @method_decorator(require_POST)
    # def dispatch(self, *args, **kwargs):
    #     return super().dispatch(*args, **kwargs)

    # @method_decorator(require_POST)
    # @csrf_exempt
    # def duplicate_event(self, request, *args, **kwargs):
    #     event_id = kwargs['event_id']
    #     new_event = duplicate_entity('Event', event_id)
    #     if new_event:
    #         print(new_event)
    #         return JsonResponse({'status': 'success', 'data': new_event.id})
    #     else:
    #         return JsonResponse({'status': 'error', 'message': 'Event not found'}, status=404)


class EventListCreateView(ListCreateAPIView):
    # queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        if self.request.user.role == 'Organisation Admin':
            # Organisation Admins see events owned by their organisation
            return Event.objects.filter(owner=self.request.user.organisation.id)

        elif self.request.user.role == 'Admin':  # Admins see all events
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
