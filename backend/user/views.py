from django.contrib.auth import get_user_model
from rest_framework.generics import (ListAPIView, RetrieveUpdateDestroyAPIView,
                                     get_object_or_404, RetrieveAPIView)
from rest_framework.response import Response
from project.permissions import IsSelfOrReadOnly
from user.serializers import UserSerializer

User = get_user_model()


class ListUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ReadUpdateDeleteMyUserView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsSelfOrReadOnly]
    lookup_field = "me"

    def get_object(self):
        user = self.request.user
        obj = get_object_or_404(User, id=user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        self.perform_update(serializer)

        return Response(serializer.data)


class RetrieveUserView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'
