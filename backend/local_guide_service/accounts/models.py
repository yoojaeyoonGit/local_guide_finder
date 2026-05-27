import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class UserRole(models.TextChoices):
    TRAVELER = "traveler", "여행자"
    GUIDE = "guide", "가이드"
    ADMIN = "admin", "관리자"


class UserStatus(models.TextChoices):
    ACTIVE = "active", "정상"
    SUSPENDED = "suspended", "정지"
    DELETED = "deleted", "탈퇴"


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError("이메일은 필수입니다.")
        email = self.normalize_email(email)
        extra_fields.setdefault("role", UserRole.TRAVELER)
        extra_fields.setdefault("status", UserStatus.ACTIVE)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", UserRole.ADMIN)
        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.TRAVELER)
    status = models.CharField(max_length=20, choices=UserStatus.choices, default=UserStatus.ACTIVE)
    profile_image_url = models.CharField(max_length=500, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = UserManager()

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.email

    @property
    def is_guide(self):
        return self.role == UserRole.GUIDE

    @property
    def is_traveler(self):
        return self.role == UserRole.TRAVELER


class UserLanguage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="languages")
    language_code = models.CharField(max_length=10)
    proficiency_level = models.CharField(max_length=20)

    class Meta:
        db_table = "user_languages"

    def __str__(self):
        return f"{self.user.email} - {self.language_code}"
