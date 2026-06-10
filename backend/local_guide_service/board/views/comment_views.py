from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from board.models import Post, Comment
from board.serializers.board_serializers import CommentSerializer


@extend_schema(
    tags=["댓글"],
    summary="댓글 목록 조회 / 작성",
    request=CommentSerializer,
    responses={200: CommentSerializer(many=True), 201: CommentSerializer},
)
@api_view(["GET", "POST"])
def comment_list(request, post_id):
    """댓글 목록 조회 / 작성"""
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({"error": "게시글을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        comments = Comment.objects.filter(post=post).select_related("author")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    serializer = CommentSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    serializer.save(post=post, author=request.user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@extend_schema(
    tags=["댓글"],
    summary="댓글 삭제",
    request=None,
    responses={204: None},
)
@api_view(["DELETE"])
def comment_delete(request, comment_id):
    """댓글 삭제 (본인만)"""
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"error": "댓글을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

    if comment.author_id != request.user.pk:
        return Response({"error": "본인의 댓글만 삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)