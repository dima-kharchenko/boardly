from django.contrib import admin
from django.urls import path
from api.views import RegisterView, LoginView, LogoutView, StatusView, UpdateUserView, DeleteUserView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/login/", LoginView.as_view(), name="login"),
    path("api/auth/logout/", LogoutView.as_view(), name="logout"),
    path("api/auth/status/", StatusView.as_view(), name="status"),
    path("api/auth/update/", UpdateUserView.as_view(), name="update"),
    path("api/auth/delete/", DeleteUserView.as_view(), name="delete"),
]
