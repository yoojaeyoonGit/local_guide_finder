from django.urls import path
from accounts.views.auth_views import sign_up, login, token_refresh, me, LogoutView

urlpatterns = [
    path("signup/", sign_up, name="signup"),
    path("login/", login, name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("refresh/", token_refresh, name="token-refresh"),
    path("me/", me, name="me"),
]
