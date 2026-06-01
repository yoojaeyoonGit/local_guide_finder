from django.db import models
from accounts.models import User


class ReportStatus(models.TextChoices):
    OPEN = "open", "접수됨"
    UNDER_REVIEW = "under_review", "검토중"
    RESOLVED = "resolved", "처리완료"
    DISMISSED = "dismissed", "기각됨"


class Report(models.Model):
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="filed_reports")
    target_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_reports")
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=ReportStatus.choices, default=ReportStatus.OPEN)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "reports"

    def __str__(self):
        return f"{self.reporter.name} -> {self.target_user.name} [{self.status}]"


class Blacklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blacklist_entries")
    reason = models.TextField()
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "blacklist"

    def __str__(self):
        return f"{self.user.name} (만료: {self.expires_at})"
