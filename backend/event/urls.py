from django.urls import path
from .views import DeleteEventView, EventCreateView, UserEventListView

event_urlpatterns = [
    path('events/', UserEventListView.as_view(), name='event-list'),  # add GET list.
    path('events/new/<int:pk>/', EventCreateView.as_view(), name='event-create'),  # creates an event
    path('events/<int:pk>/', DeleteEventView.as_view(), name='delete-comment'),  # GET list, PATCH, DELETE
]
