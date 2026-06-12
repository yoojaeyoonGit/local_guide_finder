from django.db import models
from accounts.models import User


class GuideProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name="guide_profile")
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    introduction = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "guide_profiles"

    def __str__(self):
        return f"{self.user.name} ({self.city}, {self.country})"


class GuideProduct(models.Model):
    guide = models.ForeignKey(GuideProfile, on_delete=models.CASCADE, related_name="products")
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    travel_start_date = models.DateField(null=True, blank=True)
    travel_end_date = models.DateField(null=True, blank=True)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    review_count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "guide_products"

    def __str__(self):
        return self.title


class GuideProductImage(models.Model):
    product = models.ForeignKey(GuideProduct, on_delete=models.CASCADE, related_name="images")
    image_url = models.CharField(max_length=500)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        db_table = "guide_product_images"
        ordering = ["order"]
