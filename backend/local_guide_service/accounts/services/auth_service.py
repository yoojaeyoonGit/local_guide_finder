from rest_framework.response import Response


def set_cookie_on_login(user, access_token: str, refresh_token: str) -> Response:
    data = {
        "user_id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role,
    }
    response = Response(data)
    response.set_cookie(
        "access_token",
        access_token,
        httponly=True,
        samesite="Lax",
        max_age=60 * 5,
    )
    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        samesite="Strict",
        max_age=60 * 60 * 24 * 5,
    )
    return response


def set_cookie_on_refresh(access_token: str, refresh_token: str) -> Response:
    response = Response({"message": "success"})
    response.set_cookie(
        "access_token",
        access_token,
        httponly=True,
        samesite="Lax",
        max_age=60 * 5,
    )
    response.set_cookie(
        "refresh_token",
        refresh_token,
        httponly=True,
        samesite="Strict",
        max_age=60 * 60 * 24 * 5,
    )
    return response
