from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import UserRole
from accounts.permissions import IsTraveler, IsGuide
from guides.models import GuideProfile
from guides.serializers.guide_serializers import GuideProfileCreateSerializer, GuideProfileSerializer


@extend_schema(
    tags=["가이드"],
    summary="가이드 등록",
    request=GuideProfileCreateSerializer,
    responses={201: GuideProfileSerializer},
)
@api_view(["POST"])
@permission_classes([IsTraveler])
def register_as_guide(request):
    """여행객이 가이드 프로필을 등록하면 role이 guide로 변경됩니다."""
    if hasattr(request.user, "guide_profile"):
        return Response({"error": "이미 가이드 프로필이 존재합니다."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = GuideProfileCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    profile = serializer.save(user=request.user)

    request.user.role = UserRole.GUIDE
    request.user.save(update_fields=["role"])

    return Response(GuideProfileSerializer(profile).data, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=["가이드"],
    summary="내 가이드 프로필 조회/수정",
    request=GuideProfileCreateSerializer,
    responses={200: GuideProfileSerializer},
)
@api_view(["GET", "PATCH"])
@permission_classes([IsGuide])
def my_guide_profile(request):
    try:
        profile = request.user.guide_profile
    except GuideProfile.DoesNotExist:
        return Response({"error": "가이드 프로필이 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(GuideProfileSerializer(profile).data)

    serializer = GuideProfileCreateSerializer(profile, data=request.data, partial=True)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return Response(GuideProfileSerializer(profile).data)