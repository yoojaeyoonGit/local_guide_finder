from django.utils import timezone
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers as s, status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsGuide
from common.supabase_utils import upload_image_to_supabase, delete_file_from_supabase
from guides.models import GuideProduct, GuideProductImage
from guides.serializers.guide_serializers import GuideProductListSerializer, GuideProductSerializer, GuideProductCreateSerializer

MAX_PRODUCT_IMAGES = 5

_ProductCreateRequest = inline_serializer(
    "ProductCreateRequest",
    {
        "title": s.CharField(),
        "description": s.CharField(),
        "category": s.CharField(),
        "country": s.CharField(),
        "city": s.CharField(),
        "price": s.DecimalField(max_digits=10, decimal_places=2),
        "travel_start_date": s.DateField(required=False),
        "travel_end_date": s.DateField(required=False),
        "images": s.ListField(child=s.ImageField(), required=False, max_length=5),
    },
)


@extend_schema(
    tags=["상품"],
    summary="상품 목록 조회 / 상품 생성",
    request=_ProductCreateRequest,
    responses={200: GuideProductListSerializer(many=True), 201: GuideProductSerializer},
)
@api_view(["GET", "POST"])
@parser_classes([MultiPartParser, FormParser])
def product_list(request):
    """상품 목록 조회 (인증 사용자) / 상품 생성 (가이드만)"""
    if request.method == "GET":
        today = timezone.now().date()
        GuideProduct.objects.filter(is_active=True, travel_end_date__lt=today).update(is_active=False)
        products = GuideProduct.objects.all().select_related("guide__user").prefetch_related("images")
        serializer = GuideProductListSerializer(products, many=True)
        return Response(serializer.data)

    if not IsGuide().has_permission(request, None):
        return Response({"error": "가이드만 상품을 생성할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

    serializer = GuideProductCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    images = request.FILES.getlist("images")
    if len(images) > MAX_PRODUCT_IMAGES:
        return Response({"error": f"이미지는 최대 {MAX_PRODUCT_IMAGES}개까지 업로드 가능합니다."}, status=status.HTTP_400_BAD_REQUEST)

    product = serializer.save(guide=request.user.guide_profile)

    for order, image_file in enumerate(images):
        url = upload_image_to_supabase(image_file, folder="products")
        GuideProductImage.objects.create(product=product, image_url=url, order=order)

    return Response(GuideProductSerializer(product).data, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=["상품"],
    summary="내 상품 목록 조회",
    responses={200: GuideProductListSerializer(many=True)},
)
@api_view(["GET"])
@permission_classes([IsGuide])
def my_product_list(request):
    """내 상품 목록 조회 (가이드만)"""
    products = GuideProduct.objects.filter(guide=request.user.guide_profile).prefetch_related("images")
    serializer = GuideProductListSerializer(products, many=True)
    return Response(serializer.data)


@extend_schema(
    tags=["상품"],
    summary="상품 상세 조회 / 수정 / 삭제",
    request=_ProductCreateRequest,
    responses={200: GuideProductSerializer},
)
@api_view(["GET", "PATCH", "DELETE"])
@parser_classes([MultiPartParser, FormParser])
def product_detail(request, product_id):
    """상품 상세 조회 / 수정 / 삭제"""
    try:
        product = GuideProduct.objects.select_related("guide__user").prefetch_related("images").get(id=product_id)
    except GuideProduct.DoesNotExist:
        return Response({"error": "상품을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(GuideProductSerializer(product).data)

    if not IsGuide().has_permission(request, None):
        return Response({"error": "가이드만 상품을 수정/삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

    if product.guide_id != request.user.pk:
        return Response({"error": "본인의 상품만 수정/삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

    if request.method == "DELETE":
        for img in product.images.all():
            delete_file_from_supabase(img.image_url)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = GuideProductCreateSerializer(product, data=request.data, partial=True)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    serializer.save()

    images = request.FILES.getlist("images")
    if images:
        if len(images) > MAX_PRODUCT_IMAGES:
            return Response({"error": f"이미지는 최대 {MAX_PRODUCT_IMAGES}개까지 업로드 가능합니다."}, status=status.HTTP_400_BAD_REQUEST)
        for img in product.images.all():
            delete_file_from_supabase(img.image_url)
        product.images.all().delete()
        for order, image_file in enumerate(images):
            url = upload_image_to_supabase(image_file, folder="products")
            GuideProductImage.objects.create(product=product, image_url=url, order=order)

    return Response(GuideProductSerializer(product).data)