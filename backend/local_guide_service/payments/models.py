from django.db import models
from accounts.models import User
from matches.models import MatchRequest


class PaymentStatus(models.TextChoices):
    PENDING = "pending", "결제 대기"
    COMPLETED = "completed", "결제 완료"
    REFUNDED = "refunded", "환불됨"
    FAILED = "failed", "결제 실패"


class PaymentHistory(models.Model):
    traveler = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payments_as_traveler")
    guide = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payments_as_guide")
    match_request = models.OneToOneField(MatchRequest, on_delete=models.CASCADE, related_name="payment")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "payment_history"

    def __str__(self):
        return f"{self.traveler.name} -> {self.guide.name} ({self.amount})"
