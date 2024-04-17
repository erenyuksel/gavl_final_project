from django.urls import path
from .views import ProjectListView, ProjectCreateView, ProjectRetrieveUpdateDestroyView

contestant_projects_urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/create/', ProjectCreateView.as_view(), name='project-create'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),
]