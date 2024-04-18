from user.views import (ListUsersView, ReadUpdateDeleteMyUserView, RetrieveUserView, ListOrganisationsView)

from django.urls import path

user_urlpatterns = [
    path("users/", ListUsersView.as_view()),
    path("users/add/", ListUsersView.as_view()),
    path("users/me/", ReadUpdateDeleteMyUserView.as_view()),
    path("users/<int:user_id>/", RetrieveUserView.as_view()),
]

organisation_urlpatterns = [
    path("organisations/", ListOrganisationsView.as_view()),
    path("organisations/add/", ListOrganisationsView.as_view()),  # path("organisations/<int:user_id>/",ReadUpdateDeleteMyOrganisationView.as_view()),
]
