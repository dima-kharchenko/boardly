from django.urls import path
from .views import RegisterView, LoginView, LogoutView, StatusView, UpdateUserView, DeleteUserView


urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path("auth/status/", StatusView.as_view(), name="status"),
    path("auth/update/", UpdateUserView.as_view(), name="update"),
    path("auth/delete/", DeleteUserView.as_view(), name="delete"),
]
