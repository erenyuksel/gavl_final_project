from rest_framework_simplejwt.tokens import RefreshToken

from project import settings
from registration.models import Token
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.backends import TokenBackend


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


def is_token_valid(token):
    try:
        # Assuming default settings for the token backend, you may need to adjust based on your settings
        token_backend = TokenBackend(algorithm="HS256", signing_key=settings.SECRET_KEY)
        valid_data = token_backend.decode(token, verify=True)
        print(valid_data)
        return True

    except InvalidToken as e:
        print("Invalid token:", str(e))
        return False

    except TokenError as e:
        print("Token error:", str(e))
        return False
