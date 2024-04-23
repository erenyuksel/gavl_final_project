from django.urls import path
from .views import ProjectListCreateView, ProjectRetrieveUpdateDestroyView, EventsForProjectView, EvaluationsForProjectView

contestant_projects_urlpatterns = [
    path('projects/', ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),
    path('projects/<int:project_id>/events/', EventsForProjectView.as_view(), name='events-for-project'),
    path('projects/<int:project_id>/evaluations/', EvaluationsForProjectView.as_view(), name='evaluations-for-project'),
]
