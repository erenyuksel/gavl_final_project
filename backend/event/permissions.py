from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthor(BasePermission):
    def has_permission(self, request, view, obj):
        return bool(
            request.user == obj.user
        ),


class IsSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(
            request.user == obj
        )


class SafeMethods(BasePermission):
    def has_permission(self, request, view):
        return bool(request.method in SAFE_METHODS)
