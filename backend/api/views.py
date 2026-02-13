from django.contrib.auth import (authenticate, login, logout,
                                 update_session_auth_hash)
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Board, BoardMember

from .serializers import (BoardMemberSerializer, BoardSerializer,
                          UserSerializer, UserUpdateSerializer)


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

        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({'success': True})


class StatusView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "logged_in": request.user.is_authenticated,
            "username": request.user.username if request.user.is_authenticated else None
        })


class UpdateUserView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        user = serializer.save()
        update_session_auth_hash(self.request, user)


class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        with transaction.atomic():
            logout(request)
            user.delete()

        return Response({"success": True}, status=status.HTTP_200_OK)


class CreateBoardView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        serializer = BoardSerializer(data=request.data)

        if serializer.is_valid():
            board = serializer.save(owner=request.user)

            BoardMember.objects.create(
                board=board,
                user=request.user,
                is_favorite=request.data.get("is_favorite", False),
                role="owner",
            )

            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class DeleteBoardView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, board_id):
        board = get_object_or_404(
                Board,
                id=board_id,
                owner=request.user,
                )
        board.delete()

        return Response({'success': True}, status=status.HTTP_200_OK)


class GetBoardsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        boards = request.user.board_memberships.all()
        serializer = BoardMemberSerializer(boards, many=True)

        return Response(serializer.data)


class UpdateBoardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, board_id):
        board = get_object_or_404(Board, id=board_id, owner=request.user)
        serializer = BoardSerializer(board, request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


class UpdateMyBoardMemberView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, board_id):
        member = get_object_or_404(BoardMember, board=board_id, user=request.user)
        serializer = BoardMemberSerializer(member, request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)
