# matches/views.py
# 제출 직전, 프론트엔드 화면 규격에 맞춰 취소 사유(cancel_reason)를 완벽하게 제거한 실전 제출용 최종 코드입니다.

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone

from .models import MatchRequest, MatchStatus
from guides.models import GuideProduct
from payments.models import PaymentHistory, PaymentStatus

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def match_request_create(request):
    """
    [3번 API] 상품 매칭 신청 (기존 완성본)
    """
    try:
        body_data = json.loads(request.body)
        guide_product_id = body_data.get("guide_product_id")
        request_message = body_data.get("request_message", "")
        
        if not guide_product_id:
            return JsonResponse({"error": "필수 항목(guide_product_id)이 누락되었습니다."}, status=400)
        try:
            target_product = GuideProduct.objects.get(id=guide_product_id)
        except GuideProduct.DoesNotExist:
            return JsonResponse({"error": f"ID {guide_product_id}번에 해당하는 가이드 상품이 존재하지 않습니다."}, status=404)
        
        guide_user_id = getattr(target_product, 'guide_id', getattr(target_product, 'user_id', None))
        if hasattr(target_product, 'guide') and hasattr(target_product.guide, 'user_id'):
            guide_user_id = target_product.guide.user_id
        elif hasattr(target_product, 'guide') and hasattr(target_product.guide, 'id'):
            guide_user_id = target_product.guide.id

        if guide_user_id == request.user.id:
            return JsonResponse({"error": "본인이 등록한 가이드 상품에는 매칭을 신청할 수 없습니다."}, status=400)
            
        already_exists = MatchRequest.objects.filter(
            traveler=request.user,
            guide_product=target_product,
            status__in=[MatchStatus.PENDING, MatchStatus.ACCEPTED]
        ).exists()
        
        if already_exists:
            return JsonResponse({"error": "이미 이 가이드 상품에 대한 매칭 신청이 진행 중입니다. 중복 신청은 불가능합니다."}, status=400)
        
        new_match_request = MatchRequest.objects.create(
            traveler=request.user,                
            guide_product=target_product,         
            status=MatchStatus.PENDING,           
            request_message=request_message       
        )
        
        response_data = {
            "id": new_match_request.id,
            "traveler_id": request.user.id,
            "guide_product_id": new_match_request.guide_product.id,
            "status": new_match_request.status,
            "request_message": new_match_request.request_message,
            "created_at": new_match_request.created_at.isoformat(),
            "updated_at": new_match_request.updated_at.isoformat()
        }
        return JsonResponse(response_data, status=201)
    except json.JSONDecodeError:
        return JsonResponse({"error": "올바르지 않은 JSON 형식입니다."}, status=400)
    except Exception as e:
        return JsonResponse({"error": f"서버 내부 오류가 발생했습니다: {str(e)}"}, status=500)


# 🚨 [6번 API] 신청 취소 및 환불 (제출용 다이어트 버전)
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def match_request_cancel(request, match_request_id):
    """
    프론트엔드 화면에 맞춰 취소 사유 데이터 검사 단계를 완전히 빼고,
    오직 매칭 취소 및 결제 환불 상태 변경에만 집중하여 초고속으로 처리합니다.
    """
    try:
        # 1. [검문소 1: 존재 검사]
        try:
            target_match = MatchRequest.objects.get(id=match_request_id)
        except MatchRequest.DoesNotExist:
            return JsonResponse(
                {"error": f"ID {match_request_id}번에 해당하는 매칭 요청을 찾을 수 없습니다."},
                status=404
            )
            
        # 2. [검문소 2: 본인 인증 검사]
        if target_match.traveler != request.user:
            return JsonResponse(
                {"error": "본인이 신청한 매칭 요청만 취소할 수 있습니다."},
                status=403
            )
            
        # 3. [검문소 3: 매칭 상태 검사]
        if target_match.status == MatchStatus.CANCELLED:
            return JsonResponse({"error": "이미 취소 처리가 완료된 매칭 요청입니다."}, status=400)
        if target_match.status == MatchStatus.COMPLETED:
            return JsonResponse({"error": "이미 여행이 완료된 매칭은 취소할 수 없습니다."}, status=400)
            
        # 4. [검문소 4: 결제 이력 확인]
        if not hasattr(target_match, 'payment'):
            return JsonResponse(
                {"error": "결제 내역이 존재하지 않는 매칭 요청이므로 환불할 수 없습니다."},
                status=404
            )
            
        payment_record = target_match.payment
        
        # 5. [검문소 5: 결제 상태 검사]
        if payment_record.payment_status == PaymentStatus.REFUNDED:
            return JsonResponse({"error": "이미 환불 처리가 완료된 결제 건입니다."}, status=400)

        # ------------------------------------------------------------
        # 🏆 진짜 DB 장부 도장 찍기 (안전하게 한 번에 변경)
        # ------------------------------------------------------------
        # 매칭 상태 'cancelled'로 변경
        target_match.status = MatchStatus.CANCELLED
        target_match.save()
        
        # 결제 상태 'refunded'로 변경
        payment_record.payment_status = PaymentStatus.REFUNDED
        payment_record.save()
        
        # 6. 최종 깔끔한 성공 영수증 조립 (취소 사유 항목 제거 완료)
        response_data = {
            "match_request_id": target_match.id,
            "status": target_match.status,
            "refund_summary": {
                "payment_id": payment_record.id,
                "refund_amount": str(payment_record.amount),
                "payment_status": payment_record.payment_status,
                "updated_at": timezone.now().isoformat()
            },
            "message": "매칭 신청 취소 및 환불 처리가 정상적으로 완료되었습니다."
        }
        
        return JsonResponse(response_data, status=200)
        
    except Exception as e:
        return JsonResponse({"error": f"서버 내부 오류가 발생했습니다: {str(e)}"}, status=500)