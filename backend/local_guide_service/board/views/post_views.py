from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers as s, status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from board.models import Post, PostImage, PostLike
from board.serializers.board_serializers import (
    PostListSerializer,
    PostDetailSerializer,
    PostCreateSerializer,
)
from common.supabase_utils import upload_image_to_supabase, delete_file_from_supabase

MAX_POST_IMAGES = 5

_PostCreateRequest = inline_serializer(
    "PostCreateRequest",
    {
        "title": s.CharField(),
        "content": s.CharField(),
        "images": s.ListField(child=s.ImageField(), required=False, max_length=5),
    },
)

_LikeResponse = inline_serializer(
    "LikeResponse",
    {
        "liked": s.BooleanField(),
        "like_count": s.IntegerField(),
    },
)


@extend_schema(
    tags=["게시판"],
    summary="게시글 목록 조회 / 작성",
    request=_PostCreateRequest,
    responses={200: PostListSerializer(many=True), 201: PostDetailSerializer},
)
@api_view(["GET", "POST"])
@parser_classes([MultiPartParser, FormParser])
def post_list(request):
    """게시글 목록 조회 / 작성"""
    if request.method == "GET":
        posts = Post.objects.select_related("author").all()
        serializer = PostListSerializer(posts, many=True)
        return Response(serializer.data)

    serializer = PostCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    images = request.FILES.getlist("images")
    if len(images) > MAX_POST_IMAGES:
        return Response({"error": f"이미지는 최대 {MAX_POST_IMAGES}개까지 업로드 가능합니다."}, status=status.HTTP_400_BAD_REQUEST)

    post = serializer.save(author=request.user)

    for order, image_file in enumerate(images):
        url = upload_image_to_supabase(image_file, folder="posts")
        PostImage.objects.create(post=post, image_url=url, order=order)

    return Response(PostDetailSerializer(post).data, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=["게시판"],
    summary="게시글 상세 조회 / 수정 / 삭제",
    request=_PostCreateRequest,
    responses={200: PostDetailSerializer},
)
@api_view(["GET", "PATCH", "DELETE"])
@parser_classes([MultiPartParser, FormParser])
def post_detail(request, post_id):
    """게시글 상세 조회 / 수정 / 삭제"""
    try:
        post = Post.objects.select_related("author").prefetch_related("images").get(id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "게시글을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(PostDetailSerializer(post).data)

    if post.author_id != request.user.pk:
        return Response({"error": "본인의 게시글만 수정/삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

    if request.method == "DELETE":
        for img in post.images.all():
            delete_file_from_supabase(img.image_url)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = PostCreateSerializer(post, data=request.data, partial=True)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    serializer.save()

    images = request.FILES.getlist("images")
    if images:
        if len(images) > MAX_POST_IMAGES:
            return Response({"error": f"이미지는 최대 {MAX_POST_IMAGES}개까지 업로드 가능합니다."}, status=status.HTTP_400_BAD_REQUEST)
        for img in post.images.all():
            delete_file_from_supabase(img.image_url)
        post.images.all().delete()
        for order, image_file in enumerate(images):
            url = upload_image_to_supabase(image_file, folder="posts")
            PostImage.objects.create(post=post, image_url=url, order=order)

    return Response(PostDetailSerializer(post).data)


@extend_schema(
    tags=["게시판"],
    summary="좋아요 토글",
    request=None,
    responses={200: _LikeResponse, 201: _LikeResponse},
)
@api_view(["POST"])
def post_like_toggle(request, post_id):
    """게시글 좋아요 토글"""
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "게시글을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    like, created = PostLike.objects.get_or_create(post=post, user=request.user)
    if not created:
        like.delete()
        return Response({"liked": False, "like_count": post.like_count})

    return Response({"liked": True, "like_count": post.like_count}, status=status.HTTP_201_CREATED)