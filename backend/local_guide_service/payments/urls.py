# payments/urls.py
# 이 파일은 payments(결제) 폴더 내부 전용 주소록입니다.

from django.urls import path
from . import views

urlpatterns = [
    # 대문 주소록에서 'api/v1/payments/'까지 읽고 이쪽으로 보냈기 때문에,
    # 여기를 비워두면 최종 주소는 'api/v1/payments/'가 됩니다.
    path("", views.payment_create, name="payment_create"),
]