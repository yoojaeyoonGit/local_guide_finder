from rest_framework import serializers
from guides.models import GuideProfile, GuideProduct, GuideProductImage


class GuideProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideProfile
        fields = ("country", "city", "introduction")


class GuideProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideProfile
        fields = ("user_id", "country", "city", "introduction", "created_at", "updated_at")
        read_only_fields = ("user_id", "created_at", "updated_at")


class GuideProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideProductImage
        fields = ("id", "image_url", "order")
        read_only_fields = ("id",)


class GuideProductListSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = GuideProduct
        fields = (
            "id", "guide_id", "title", "category",
            "country", "city", "price", "thumbnail_url",
            "travel_start_date", "travel_end_date",
            "average_rating", "review_count", "is_active",
            "created_at", "updated_at",
        )
        read_only_fields = ("id", "guide_id", "average_rating", "review_count", "created_at", "updated_at")

    def get_thumbnail_url(self, obj):
        first = obj.images.first()
        return first.image_url if first else None


class GuideProductSerializer(serializers.ModelSerializer):
    images = GuideProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = GuideProduct
        fields = (
            "id", "guide_id", "title", "description", "category",
            "country", "city", "price", "images",
            "travel_start_date", "travel_end_date",
            "average_rating", "review_count", "is_active",
            "created_at", "updated_at",
        )
        read_only_fields = ("id", "guide_id", "average_rating", "review_count", "created_at", "updated_at")


class GuideProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideProduct
        fields = (
            "title", "description", "category",
            "country", "city", "price",
            "travel_start_date", "travel_end_date",
        )