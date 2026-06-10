from rest_framework import serializers
from board.models import Post, PostImage, Comment


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ("id", "image_url", "order")
        read_only_fields = ("id",)


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)

    class Meta:
        model = Comment
        fields = ("id", "author", "author_name", "content", "created_at")
        read_only_fields = ("id", "author", "created_at")


class PostListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    comment_count = serializers.IntegerField(read_only=True)
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            "id", "author", "author_name", "title",
            "thumbnail_url", "like_count", "comment_count",
            "created_at", "updated_at",
        )
        read_only_fields = ("id", "author", "created_at", "updated_at")

    def get_thumbnail_url(self, obj):
        first = obj.images.first()
        return first.image_url if first else None


class PostDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    comment_count = serializers.IntegerField(read_only=True)
    images = PostImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            "id", "author", "author_name", "title", "content",
            "images", "like_count", "comment_count",
            "created_at", "updated_at",
        )
        read_only_fields = ("id", "author", "created_at", "updated_at")


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("title", "content")
