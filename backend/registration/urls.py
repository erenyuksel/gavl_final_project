from django.urls import path

from registration.views import RegisterView, RegisterValidationView, PasswordResetView, PasswordResetValidationView, \
    RegisterPasswordView

registration_urlpatterns = [
    path("auth/registration/", RegisterView.as_view()),
    path("auth/registration/validation/", RegisterValidationView.as_view()),
    path("auth/registration/password/", RegisterPasswordView.as_view()),
    path('auth/password-reset/', PasswordResetView.as_view(), name='password-reset'),
    path('auth/password-reset/validate/', PasswordResetValidationView.as_view(), name='password-reset-validation'),
]
