from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.db import transaction
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash

from .serializers import UserSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        login(self.request, user)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success': True, "username": user.username})
        return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return Response({'success': True})


class StatusView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({"logged_in": True, "username": request.user.username})
        return Response({"logged_in": False})


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        username = request.data.get("username")
        password = request.data.get("password")

        if username:
            if User.objects.filter(username=username).exclude(id=user.id).exists():
                return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)
            user.username = username

        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)

        user.save()

        return Response({"success": True, "username": user.username}, status=status.HTTP_200_OK)


class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        with transaction.atomic():
            logout(request)
            user.delete()

        return Response({"success": True}, status=status.HTTP_200_OK)

