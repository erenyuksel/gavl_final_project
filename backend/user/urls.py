from user.views import (ListUsersView, ReadUpdateDeleteMyUserView, RetrieveUserView, ListOrganisationsView,
                        ReadUpdateInvitationUserView, InactivateUserTokenView)

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
    # path("organisations/<int:user_id>/",ReadUpdateDeleteMyOrganisationView.as_view()),
]
