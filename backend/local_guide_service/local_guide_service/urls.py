from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/v1/auth/", include("accounts.urls.auth_urls")),
    path("api/v1/guides/", include("guides.urls")),
    path("api/v1/matches/", include("matches.urls")),
    path("api/v1/chat/", include("chat.urls")),
    path("api/v1/reviews/", include("reviews.urls")),
    path("api/v1/reports/", include("reports.urls")),
    path("api/v1/notifications/", include("notifications.urls")),
    path("api/v1/payments/", include("payments.urls")),

    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
