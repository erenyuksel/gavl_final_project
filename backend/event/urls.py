from django.urls import path
from .views import EventRetrieveUpdateDestroyView, EventListCreateView

event_urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroyView.as_view(), name='delete-comment'),
]
