from django.db import models
from accounts.models import User


class NotificationType(models.TextChoices):
    MATCH = "match", "매칭"
    CHAT = "chat", "채팅"
    REVIEW = "review", "리뷰"
    SYSTEM = "system", "시스템"


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    type = models.CharField(max_length=20, choices=NotificationType.choices)
    title = models.CharField(max_length=200)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "notifications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.name} - {self.title}"
