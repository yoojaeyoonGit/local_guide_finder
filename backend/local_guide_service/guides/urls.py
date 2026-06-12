from django.urls import path
from guides.views.guide_views import register_as_guide, my_guide_profile
from guides.views.product_views import product_list, my_product_list, product_detail

urlpatterns = [
    path("register/", register_as_guide, name="guide-register"),
    path("profile/", my_guide_profile, name="guide-profile"),

    path("products/", product_list, name="product-list"),
    path("products/me/", my_product_list, name="my-product-list"),
    path("products/<int:product_id>/", product_detail, name="product-detail"),
]
