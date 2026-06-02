from django.db import models
from accounts.models import User
from guides.models import GuideProduct


class MatchStatus(models.TextChoices):
    PENDING = "pending", "요청 대기중"
    ACCEPTED = "accepted", "수락됨"
    REJECTED = "rejected", "거절됨"
    CANCELLED = "cancelled", "취소됨"
    COMPLETED = "completed", "완료됨"


class MatchRequest(models.Model):
    traveler = models.ForeignKey(User, on_delete=models.CASCADE, related_name="match_requests")
    guide_product = models.ForeignKey(GuideProduct, on_delete=models.CASCADE, related_name="match_requests")
    status = models.CharField(max_length=20, choices=MatchStatus.choices, default=MatchStatus.PENDING)
    request_message = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "match_requests"

    def __str__(self):
        return f"{self.traveler.name} -> {self.guide_product.title} [{self.status}]"
