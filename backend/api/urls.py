from django.urls import path
from .views import CreateBoardView, DeleteBoardView, GetBoardsView, RegisterView, LoginView, LogoutView, StatusView, UpdateBoardView, UpdateUserView, DeleteUserView


urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/status/", StatusView.as_view(), name="status"),
    path("auth/update/", UpdateUserView.as_view(), name="update_user"),
    path("auth/delete/", DeleteUserView.as_view(), name="delete_user"),

    path("boards/", GetBoardsView.as_view(), name="get_boards"),
    path("boards/create/", CreateBoardView.as_view(), name="create_board"),
    path("boards/delete/<int:board_id>/", DeleteBoardView.as_view(), name="delete_board"),
    path("boards/update/<int:board_id>/", UpdateBoardView.as_view(), name="update_board"),
]
