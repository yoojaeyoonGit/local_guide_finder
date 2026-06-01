import './PackageEdit2.css'
import { useNavigate } from "react-router-dom";

function PackageEdit2() {
  const navigate = useNavigate();
  return (
    <div className="page">

      <div className="top-header">
        <h1>베이징 관광 패키지</h1>
        <button>편집</button>
      </div>

      <div className="package-box">

        <div className="image-list">
          <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop" />
          <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop" />
          <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop" />
          <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop" />
          <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop" />
        </div>

        <div className="info-box">
          <span>제목</span>
          <input value="베이징 관광 패키지" />
        </div>

        <div className="info-box">
          <span>일정</span>
          <input value="날짜 선택" />
        </div>

        <div className="info-box">
          <span>상태</span>
          <input value="신청 가능" />
        </div>

        <div className="info-box">
          <span>제한인원</span>
          <input value="25" />
        </div>

        <div className="content-box">
          <h3>내용</h3>

          <textarea
            defaultValue="중국 베이징의 핵심 관광지를 한 번에 만날 수 있는 특별한 패키지로, 황실의 웅장함이 살아 있는 자금성과 아름
다운 황실 정원으로 유명한 이화원, 그리고 중국을 대표하는 세계적인 문화유산 만리장성까지 둘러보며 베이징의 
역사와 문화를 깊이 있게 체험할 수 있는 알찬 여행 상품입니다.전문 가이드와 함께 이동하며 중국 황실 문화와 
웅장한 자연 경관을 동시에 즐길 수 있어 가족, 친구, 연인 모두에게 추천되는 인기 코스입니다."
          />
        </div>

        <button
  className="Apply"
  onClick={() => navigate("/pay")}
>
  신청하기
</button>

      </div>

    </div>
  )
}

export default PackageEdit2
