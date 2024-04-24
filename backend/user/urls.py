from user.views import (ListUsersView, ReadUpdateDeleteMyUserView, RetrieveUserView, ListOrganisationsView,
                        ReadUpdateInvitationUserView, InactivateUserTokenView, ReadOrganisationView)

from django.urls import path

user_urlpatterns = [
    path("users/", ListUsersView.as_view()),
    path("users/me/", ReadUpdateDeleteMyUserView.as_view()),
    path("users/invite/", ReadUpdateInvitationUserView.as_view(), name='user-invite'),
    path("users/deactivate/", InactivateUserTokenView.as_view()),
    path("users/<int:user_id>/", RetrieveUserView.as_view()),
]

organisation_urlpatterns = [
    path("organisations/", ListOrganisationsView.as_view()),
    path("organisations/<int:org_id>/", ReadOrganisationView.as_view()),
]
