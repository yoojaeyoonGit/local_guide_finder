from django.db import models
from accounts.models import User


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "board_posts"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    @property
    def like_count(self):
        return self.likes.count()

    @property
    def comment_count(self):
        return self.comments.count()


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="images")
    image_url = models.CharField(max_length=500)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "board_post_images"
        ordering = ["order"]


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="board_comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "board_comments"
        ordering = ["created_at"]

    def __str__(self):
        return f"[{self.post.title}] {self.author.name}: {self.content[:30]}"


class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="board_likes")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "board_post_likes"
        unique_together = ("post", "user")
