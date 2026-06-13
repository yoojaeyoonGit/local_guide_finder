# matches/urls.py
# 이 파일은 matches(매칭) 폴더 내부 전용 주소록입니다.

from django.urls import path
from . import views

urlpatterns = [
    # [3번 API] 매칭 신청하기 (기존 주소)
    # 최종 주소: /api/v1/matches/
    path("", views.match_request_create, name="match_request_create"),
    
    # 🚨 [6번 API] 신청 취소 및 환불하기 (새로 추가된 주소)
    # <int:match_request_id> 부분은 주소창에 들어오는 진짜 숫자(예: 3번 매칭표)를 쏙 낚아채는 장치입니다.
    # 최종 주소: /api/v1/matches/<match_request_id>/cancel/
    path("<int:match_request_id>/cancel/", views.match_request_cancel, name="match_request_cancel"),
]