from rest_framework import serializers

from accounts.models import User


class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("name", "email", "password")

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            password=validated_data["password"],
        )


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            user = User.objects.get(email=attrs["email"])
        except User.DoesNotExist:
            raise serializers.ValidationError("이메일 혹은 비밀번호가 잘못되었습니다.")

        if not user.check_password(attrs["password"]):
            raise serializers.ValidationError("이메일 혹은 비밀번호가 잘못되었습니다.")

        if not user.is_active:
            raise serializers.ValidationError("비활성화된 계정입니다.")

        return {"user": user}


class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "uuid", "name", "email", "role", "status", "profile_image_url", "created_at")
        read_only_fields = fields
