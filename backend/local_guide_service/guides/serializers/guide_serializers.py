from rest_framework import serializers
from guides.models import GuideProfile, GuideProduct


class GuideProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideProfile
        fields = ("country", "city", "introduction")


class GuideProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideProfile
        fields = ("user_id", "country", "city", "introduction", "created_at", "updated_at")
        read_only_fields = ("user_id", "created_at", "updated_at")


class GuideProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideProduct
        fields = (
            "id", "guide_id", "title", "description", "category",
            "country", "city", "price", "thumbnail_url",
            "average_rating", "review_count", "is_active",
            "created_at", "updated_at",
        )
        read_only_fields = ("id", "guide_id", "average_rating", "review_count", "created_at", "updated_at")
