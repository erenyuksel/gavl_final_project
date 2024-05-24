from django.urls import path
from .views import EvaluationListCreateAPIView, EvaluationDetailAPIView, RubricListCreateAPIView, RubricDetailAPIView, \
    EvaluationsForRubric

evaluation_urlpatterns = [
    path('evaluations/', EvaluationListCreateAPIView.as_view(), name='evaluation-list'),
    path("evaluations/<int:pk>", EvaluationDetailAPIView.as_view(), name='evaluation-id'),

]

rubric_urlpatterns = [
    path("rubrics/", RubricListCreateAPIView.as_view(), name='rubric-list'),
    path("rubrics/<int:pk>", RubricDetailAPIView.as_view(), name="rubric"),
    path('rubrics/<int:rubric_id>/evaluations/', EvaluationsForRubric.as_view(), name='evaluations-for-rubric'),
]
