from django.urls import path
from guides.views.guide_views import register_as_guide, my_guide_profile

urlpatterns = [
    path("register/", register_as_guide, name="guide-register"),
    path("profile/", my_guide_profile, name="guide-profile"),
]
