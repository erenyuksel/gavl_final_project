from django.conf.global_settings import DEFAULT_FROM_EMAIL
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework import status
from rest_framework.generics import (RetrieveUpdateDestroyAPIView,
                                     get_object_or_404, RetrieveAPIView, ListCreateAPIView)
from rest_framework.response import Response
from project.permissions import IsSelfOrReadOnly
from registration.utils import get_and_store_tokens_for_user
from user.models import Organisation
from user.serializers import UserSerializer, OrganisationSerializer

User = get_user_model()


class ListUsersView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        if user.role == 'Judge':
            tokens = get_and_store_tokens_for_user(user)
            link = 'http://127.0.0.1:8000/backend/users/invite/?token={}'.format(tokens['access'])
            print(link)
            # send email
            if serializer.is_valid():
                # new_user = User.objects.get(email=receiver_email)
                # event = serializer.data['event.name']
                message = f'You was registered as a Judge for the xxx event. To validate your account please visit {link}'
                subject = 'become a Judge'
                to_email = [serializer.data['email']]
                send_mail(subject, message, DEFAULT_FROM_EMAIL, to_email, fail_silently=False)
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)


class ReadUpdateDeleteMyUserView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsSelfOrReadOnly]
    lookup_field = "me"

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

    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')  # Access the token from the query parameters
        if not token:
            return HttpResponse("No token provided!", status=400)

        # approve user (validate user, create new token) and suggest him to change default password
        return HttpResponse(f"Token received: {token}")


class RetrieveUserView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'


class ListOrganisationsView(ListCreateAPIView):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
