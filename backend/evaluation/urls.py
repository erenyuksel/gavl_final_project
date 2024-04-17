from django.urls import path
from .views import EvaluationListCreateAPIView, EvaluationDetailAPIView, RubricListCreateAPIView, RubricDetailAPIView

evaluation_urlpatterns = [
    path('evaluations/', EvaluationListCreateAPIView.as_view(), name='evaluation-list'),
    path("evaluations/<int:pk>", EvaluationDetailAPIView.as_view(), name='evaluation-id'),

]

rubric_urlpatterns = [
    path("rubrics/", RubricListCreateAPIView.as_view(), name='rubric-list'),
    path("rubrics/<int:pk>", RubricDetailAPIView.as_view(), name="rubric")
]
