import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import PaymentHistory, PaymentStatus
from matches.models import MatchRequest

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def payment_create(request):
    """
    [4번 API] 결제하기 (셀프 결제 차단 및 유저 매칭 수정 버전)
    """
    try:
        body_data = json.loads(request.body)
        match_request_id = body_data.get("match_request_id")
        amount = body_data.get("amount")
        
        if not match_request_id or not amount:
            return JsonResponse(
                {"error": "필수 항목(match_request_id, amount)이 누락되었습니다."},
                status=400
            )
            
        try:
            target_match = MatchRequest.objects.get(id=match_request_id)
        except MatchRequest.DoesNotExist:
            return JsonResponse(
                {"error": f"ID {match_request_id}번에 해당하는 매칭 요청이 존재하지 않습니다."},
                status=404
            )
            
        if target_match.traveler != request.user:
            return JsonResponse(
                {"error": "본인의 매칭 요청에 대해서만 결제할 수 있습니다."},
                status=403
            )
            
        if hasattr(target_match, 'payment'):
            return JsonResponse(
                {"error": "이미 결제가 완료되었거나 진행 중인 매칭 요청입니다."},
                status=400
            )
            
        # 🚨 [수정된 6번 단계]: 가이드 프로필에서 '진짜 유저(User) 정보'를 쏙 뽑아냅니다.
        guide_profile = target_match.guide_product.guide
        if hasattr(guide_profile, 'user'):
            target_guide = guide_profile.user  # 'User' 인스턴스로 정확하게 매칭!
        else:
            target_guide = guide_profile
            
        # 🛑 [비즈니스 로직 방어막]: 가이드 본인이 스스로 결제하는 행위 차단
        if target_guide == request.user:
            return JsonResponse(
                {"error": "본인이 등록한 가이드 상품에는 스스로 결제할 수 없습니다."},
                status=400
            )
        
        # 7. 진짜 DB에 저장하기
        new_payment = PaymentHistory.objects.create(
            traveler=request.user,
            guide=target_guide, # 이제 규칙에 맞는 올바른 User 신분증이 들어갑니다!
            match_request=target_match,
            amount=amount,
            payment_status=PaymentStatus.COMPLETED
        )
        
        response_data = {
            "payment_id": new_payment.id,
            "traveler_id": new_payment.traveler.id,
            "guide_id": new_payment.guide.id,
            "match_request_id": new_payment.match_request.id,
            "amount": str(new_payment.amount),
            "payment_status": new_payment.payment_status,
            "created_at": new_payment.created_at.isoformat()
        }
        
        return JsonResponse(response_data, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({"error": "올바르지 않은 JSON 형식입니다."}, status=400)
    except Exception as e:
        return JsonResponse({"error": f"서버 내부 오류가 발생했습니다: {str(e)}"}, status=500)