from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from project.permissions import IsJudgeUser
from project.settings import DEFAULT_FROM_EMAIL
from registration.models import RegistrationProfile
from registration.serializers import RegisterSerializer, RegisterValidationSerializer, \
    PasswordResetValidationSerializer, PasswordResetSerializer, RegisterPasswordSerializer

User = get_user_model()


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny, ]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            receiver_email = serializer.data['email']
            new_user = User.objects.get(email=receiver_email)
            act_code = RegistrationProfile.objects.filter(user=new_user).values_list('code', flat=True)[0]
            message = f'You have received the activation code as follows : {act_code} '
            subject = 'Activation code'
            to_email = [receiver_email]
            send_mail(subject, message, DEFAULT_FROM_EMAIL, to_email, fail_silently=False)
            return Response(status=status.HTTP_201_CREATED)
        else:
            print("Validation errors:", serializer.errors)
            return Response(f'Validation errors:{serializer.errors}', status=status.HTTP_400_BAD_REQUEST)


class RegisterValidationView(GenericAPIView):
    serializer_class = RegisterValidationSerializer
    permission_classes = [AllowAny, ]

    def patch(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        if 'organisation_name' in serializer.fields:
            serializer.fields.pop('organisation_name')

        serializer.save(serializer.validated_data)
        return Response(status=status.HTTP_200_OK)


class RegisterPasswordView(GenericAPIView):
    serializer_class = RegisterPasswordSerializer
    # TODO change permissions to Judges  >> to test better!
    permission_classes = [AllowAny, ]

    def patch(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response(status=status.HTTP_200_OK)


class PasswordResetView(GenericAPIView):
    """
    post:
    Send email with password reset code to user.
    """
    permission_classes = []
    serializer_class = PasswordResetSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.send_password_reset_email()
        return Response(status=status.HTTP_200_OK)


class PasswordResetValidationView(GenericAPIView):
    """
    post:
    Update passwords.
    """
    permission_classes = []
    serializer_class = PasswordResetValidationSerializer

    def patch(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            serializer.validated_data,
        )
        return Response(status=status.HTTP_200_OK)
