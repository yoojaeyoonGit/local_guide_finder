from django.db import models
from accounts.models import User
from guides.models import GuideProduct


class ProductReview(models.Model):
    traveler = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    guide_product = models.ForeignKey(GuideProduct, on_delete=models.CASCADE, related_name="reviews")
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    review_text = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "product_reviews"
        unique_together = ("traveler", "guide_product")

    def __str__(self):
        return f"{self.traveler.name} -> {self.guide_product.title} ({self.rating})"
