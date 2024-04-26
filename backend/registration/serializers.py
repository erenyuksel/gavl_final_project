from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from rest_framework import serializers

from project.settings import DEFAULT_FROM_EMAIL
from registration.models import RegistrationProfile, get_activation_code

from user.models import Organisation

User = get_user_model()


def email_does_exist(email):
    try:
        User.objects.get(email=email)
        return email
    except User.DoesNotExist:
        raise ValidationError(message='User does not exist!')


def email_does_not_exist(email):
    try:
        User.objects.get(email=email)
        raise ValidationError(message='This email is taken')
    except User.DoesNotExist:
        return email


def username_does_not_exist(username):
    try:
        User.objects.get(username=username)
        raise ValidationError(message='This username is taken')
    except User.DoesNotExist:
        return username


def code_is_valid(code):
    try:
        reg_profile = RegistrationProfile.objects.get(code=code)
        if not reg_profile.code_used:
            return code
        else:
            raise ValidationError(message='This code has already been used!')
    except RegistrationProfile.DoesNotExist:
        raise ValidationError(message='This code is not valid!')


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[email_does_not_exist]
    )

    def save(self, **kwargs):
        email = self.validated_data['email']
        new_user = User(
            username=email,
            email=email,
            is_active=False,
        )
        new_user.save()

    class Meta:
        model = User
        fields = ['email']


class RegisterValidationSerializer(serializers.ModelSerializer):
    password_repeat = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    code = serializers.CharField(style={'input_type': int})
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField(
        required=True,
        validators=[email_does_exist]
    )
    password = serializers.CharField()
    username = serializers.CharField(
        required=True,
        validators=[username_does_not_exist]
    )
    role = serializers.CharField()

    organisation_name = serializers.CharField()

    class Meta:
        model = User
        fields = (
            'email', 'username', 'code', 'first_name', 'last_name', 'password', 'password_repeat', 'role', 'organisation_name')

        extra_kwargs = {'password': {'write_only': True}}

    def save(self, request):
        user = User.objects.get(email=self.validated_data['email'])
        if user.is_active:
            raise serializers.ValidationError('This user is already available')
        else:
            if RegistrationProfile.objects.filter(user=user).values_list('code', flat=True)[0] == self.validated_data['code']:

                user.first_name = self.validated_data['first_name']
                user.last_name = self.validated_data['last_name']
                user.username = self.validated_data['username']
                password = self.validated_data['password']
                password_repeat = self.validated_data['password_repeat']
                if password != password_repeat:
                    raise serializers.ValidationError({'password': 'Passwords are not matching'})
                user.set_password(password)
                user.role = self.validated_data['role']
                user.is_active = True
                user.registration_profile.code_used = True

                organisation_name = self.validated_data['organisation_name']
                organisation, created = Organisation.objects.get_or_create(name=organisation_name)
                user.organisation = organisation
                user.save()
                user.registration_profile.save()
                return user
            else:
                raise serializers.ValidationError('the code is not valid')


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(label='Password Reset E-Mail Address', validators=[email_does_exist])

    def send_password_reset_email(self):
        email = self.validated_data.get('email')
        user = User.objects.get(email=email)
        user.save()
        user.registration_profile.code = get_activation_code()
        user.registration_profile.code_used = False
        user.registration_profile.code_type = 'PR'
        user.registration_profile.save()
        receiver_email = email
        message = f'You have received the password reset code as follows : {user.registration_profile.code} '
        subject = 'Password Reset code'
        to_email = [receiver_email]
        send_mail(subject, message, DEFAULT_FROM_EMAIL, to_email, fail_silently=False)


class PasswordResetValidationSerializer(serializers.Serializer):
    code = serializers.CharField(label='Validation code', write_only=True, validators=[code_is_valid])
    email = serializers.EmailField(label='Registration E-Mail Address', validators=[email_does_exist])
    password = serializers.CharField(label='password', write_only=True)
    password_repeat = serializers.CharField(label='password_repeat', write_only=True)

    def validate(self, data):
        code = data.get('code')
        email = data.get('email')
        user = User.objects.get(email=email)
        reg_profile = RegistrationProfile.objects.get(code=code)
        if reg_profile != user.registration_profile:
            raise ValidationError(message='The code does not belong to this email!')
        if data.get('password') != data.get('password_repeat'):
            raise ValidationError(message='Passwords do not match!')
        return data

    def save(self, validated_data):
        email = validated_data.get('email')
        updated_user = User.objects.get(email=email)
        updated_user.set_password(validated_data.get('password'))
        updated_user.registration_profile.code_used = True
        updated_user.registration_profile.save()
        updated_user.save()
        return updated_user


class RegisterPasswordSerializer(serializers.Serializer):
    password_repeat = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password = serializers.CharField()
    email = serializers.EmailField(validators=[email_does_exist])
    read_only_fields = ['email']

    class Meta:
        model = User
        fields = ('email', 'password', 'password_repeat')
        extra_kwargs = {'password': {'write_only': True}}

    def save(self, request, *args, **kwargs):
        user = User.objects.get(email=self.validated_data['email'])
        password = self.validated_data['password']
        password_repeat = self.validated_data['password_repeat']
        if password != password_repeat:
            raise serializers.ValidationError({'password': 'Passwords are not matching'})
        user.set_password(password)
        user.save()
        return user
