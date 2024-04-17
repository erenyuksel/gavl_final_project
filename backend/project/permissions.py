from rest_framework import permissions
from rest_framework.permissions import BasePermission


class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow Admin to access.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated and is an admin
        return request.user.is_authenticated and request.user.role == 'Admin'


class IsOrgAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow Organisation Admins to access.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated and is an admin
        return request.user.is_authenticated and request.user.role == 'Organisation Admin'


class IsJudgeUser(permissions.BasePermission):
    """
    Custom restrictions to only allow Judge to judge.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated and is an admin
        return request.user.is_authenticated and request.user.role == 'Judge'


class IsSelfOrReadOnly(BasePermission):
    """
        Custom permission to only allow users to edit their own profile.
        """
    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD, or OPTIONS requests.
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Check if the user making the request is the same as the user being updated.
        return obj == request.user


class IsNotOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user != request.user


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user == request.user
