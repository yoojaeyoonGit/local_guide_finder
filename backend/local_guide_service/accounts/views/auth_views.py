from django.views.decorators.csrf import csrf_exempt
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers as s, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from accounts.serializers.auth_serializers import SignUpSerializer, LoginSerializer, MeSerializer
from accounts.services.auth_service import set_cookie_on_login, set_cookie_on_refresh


@extend_schema(
    tags=["인증"],
    summary="회원가입",
    request=SignUpSerializer,
    responses={201: inline_serializer("SignUpResponse", {"user_id": s.UUIDField()})},
)
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def sign_up(request):
    serializer = SignUpSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.save()
    return Response({"user_id": user.id}, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=["인증"],
    summary="로그인",
    request=LoginSerializer,
    responses={200: MeSerializer},
)
@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.validated_data["user"]
    refresh = RefreshToken.for_user(user)
    return set_cookie_on_login(user, str(refresh.access_token), str(refresh))


@extend_schema(
    tags=["인증"],
    summary="토큰 갱신",
    request=None,
    responses={200: inline_serializer("TokenRefreshResponse", {"access_token": s.CharField()})},
)
@api_view(["POST"])
@permission_classes([AllowAny])
def token_refresh(request):
    refresh_token = request.COOKIES.get("refresh_token")

    if not refresh_token:
        return Response({"error": "refresh token이 없습니다."}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
    except TokenError:
        return Response({"error": "유효하지 않거나 만료된 refresh token입니다."}, status=status.HTTP_401_UNAUTHORIZED)

    return set_cookie_on_refresh(access_token, refresh_token)


@extend_schema(
    tags=["인증"],
    summary="내 정보 조회",
    responses={200: MeSerializer},
)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = MeSerializer(request.user)
    return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        tags=["인증"],
        summary="로그아웃",
        request=None,
        responses={200: inline_serializer("LogoutResponse", {"detail": s.CharField()})},
    )
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"error": "refresh token이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            return Response({"error": "유효하지 않은 토큰입니다."}, status=status.HTTP_400_BAD_REQUEST)

        response = Response({"detail": "로그아웃 성공"}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token", samesite="Lax")
        response.delete_cookie("refresh_token", samesite="Strict")
        return response