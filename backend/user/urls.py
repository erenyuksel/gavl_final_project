from user.views import (ListUsersView, ReadUpdateDeleteMyUserView, RetrieveUserView)

from django.urls import path

user_urlpatterns = [
    path("users/", ListUsersView.as_view()),
    path("users/me/", ReadUpdateDeleteMyUserView.as_view()),
    path("users/<int:user_id>/", RetrieveUserView.as_view()),
]
