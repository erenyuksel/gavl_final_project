from rest_framework_simplejwt.tokens import RefreshToken
from registration.models import Token


def get_and_store_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token

    token = Token.objects.create(
        user=user,
        refresh=str(refresh),
        access=str(access)
    )
    return {
        'refresh': str(refresh),
        'access': str(access),
        'token_id': token.id  # Optionally, keep track of the token ID
    }
