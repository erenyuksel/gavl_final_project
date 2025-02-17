from django.conf.global_settings import DEFAULT_FROM_EMAIL
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.generics import (RetrieveUpdateDestroyAPIView,
                                     get_object_or_404, RetrieveAPIView, ListCreateAPIView)
from rest_framework.response import Response

from project.permissions import IsSelfOrReadOnly
from registration.utils import get_and_store_tokens_for_user, is_token_valid
from user.models import Organisation
from user.serializers import UserSerializer, OrganisationSerializer
from registration.models import Token
from rest_framework.permissions import AllowAny

User = get_user_model()


class ListUsersView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        if user.role == 'Judge':
            event_name = self.request.query_params.get("event_name")
            tokens = get_and_store_tokens_for_user(user)
            # TODO our endpoints here:
            # link = 'http://127.0.0.1:8000/backend/users/invite/?token={}'.format(tokens['access'])
            # link1 = 'https://judge.propulsion-learn.ch/backend/users/invite/?token={}'.format(tokens['access'])

            # link = 'http://localhost:5173/invite/{}'.format(tokens['access'])
            link1 = 'https://judge.propulsion-learn.ch/invite/{}'.format(tokens['access'])

            # send email
            if serializer.is_valid():
                html_message = f'''\
                <html>
                  <body>
                    <p>Dear {user.first_name},</p>
                    <p>Here is the <a href="{link1}">invitation link</a></p>
                  </body>
                </html>
                '''
                if event_name is None:
                    subject = 'become our Judge!'
                else:
                    subject = f'become a Judge of {event_name}!'

                to_email = [serializer.data['email']]
                send_mail(subject, '', DEFAULT_FROM_EMAIL, to_email, html_message=html_message, fail_silently=False)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)


class ReadOrganisationView(RetrieveAPIView):
    serializer_class = OrganisationSerializer
    queryset = Organisation.objects.all()
    lookup_url_kwarg = 'org_id'


class ReadUpdateDeleteMyUserView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsSelfOrReadOnly]

    # lookup_field = "me"

    def get_object(self):
        user = self.request.user
        obj = get_object_or_404(User, id=user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)
        return Response(serializer.data)


class ReadUpdateInvitationUserView(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny, ]

    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')  # Access the token from the query parameters
        if not token:
            return Response("No token provided!", status=status.HTTP_400_BAD_REQUEST)

        if is_token_valid(token):
            print("The token is valid")

            token = Token.objects.get(access=token)
            user = token.user
            user.is_active = True
            user.save()
            print(user)

            return Response({
                'id': user.id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)

        else:
            print("The token is invalid")
            return Response('The token is invalid', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RetrieveUserView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'


class ListOrganisationsView(ListCreateAPIView):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer


class InactivateUserTokenView(RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')  # Access the token from the query parameters
        if not token:
            return Response("No token provided!", status=status.HTTP_400_BAD_REQUEST)

        if is_token_valid(token):
            print("The token is valid")

            token = Token.objects.get(access=token)
            user = token.user
            if user.is_active:
                if not user.password:
                    print("Password field does not exist.")
                    return Response('Profile is still not activated', status=status.HTTP_200_OK)

                else:
                    print("Password field exists.")
                    token.status = 'inactive'
                    token.save()
                    print(user)
                    return Response('Token is deactivated successfully', status=status.HTTP_200_OK)

            else:
                return Response('User account is still not activated', status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            return Response('The token is invalid', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
