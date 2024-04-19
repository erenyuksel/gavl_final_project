from django.urls import path
from .views import ProjectListCreateView, ProjectRetrieveUpdateDestroyView

contestant_projects_urlpatterns = [
    path('projects/', ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),
]
