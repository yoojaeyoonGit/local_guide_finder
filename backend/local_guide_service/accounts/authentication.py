from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken

from accounts.models import User


class CookieJWTAuthentication(BaseAuthentication):
    def authenticate_header(self, request):
        return 'Bearer realm="api"'

    def authenticate(self, request):
        access_token = request.COOKIES.get("access_token")

        if not access_token:
            return None

        try:
            payload = AccessToken(access_token)
            user = User.objects.get(id=payload["user_id"])
        except Exception:
            raise AuthenticationFailed("토큰이 만료되었거나 유효하지 않습니다.")

        return user, None
