from django.urls import path
from .views import EventRetrieveUpdateDestroyView, EventListCreateView, duplicate_event

event_urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroyView.as_view(), name='delete-comment'),
    path('events/duplicate/<int:event_id>/', duplicate_event, name='duplicate-event'),
    # path('events/duplicate/<int:event_id>/', DuplicateEventView.as_view(), name='duplicate-event'),
]
