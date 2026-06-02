from rest_framework.permissions import BasePermission

from accounts.models import UserRole


class IsTraveler(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == UserRole.TRAVELER
        )


class IsGuide(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == UserRole.GUIDE
        )


class IsTravelerOrGuide(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in (UserRole.TRAVELER, UserRole.GUIDE)
        )


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == UserRole.ADMIN
        )
