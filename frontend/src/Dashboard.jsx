import './Dashboard.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard">

      <div className="profile-box">
        <div className="profile-left">
         <div className="profile-image-circle">
  <img src="https://picsum.photos/200" alt="profile" />
</div>

          <div>
            <h2>KYHS001</h2>
            <p>@guideman2026</p>

            <div className="profile-info">
              <span>📍 34매칭</span>
              <span>⭐ 4.7</span>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/profile")}>
  수정
</button>
      </div>

      <h1>이번 달 통계</h1>

      <div className="stats-container">

        <div className="stat-card">
          <h3>조회수</h3>
          <p>756</p>
        </div>

        <div className="stat-card">
          <h3>새 예약</h3>
          <p>13</p>
        </div>

        <div className="stat-card">
          <h3>수익</h3>
          <p>$1,240</p>
        </div>

        <div className="stat-card">
          <h3>예약률</h3>
          <p>37%</p>
        </div>

      </div>

      <div className="package-header">
        <h1>상품 패키지 관리</h1>
       <button onClick={() => alert('새 상품이 추가되었습니다.')}>
  + 새 상품
</button>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="상품 검색..."
      />

      <div className="package-container">

        <div
          className="package-card"
          onClick={() => navigate("/package-edit")}
        >
          <img
            src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop"
            alt="travel"
          />

          <div className="package-content">
            <h2>베이징 관광 패키지</h2>
            <p>자금성 · 이화원 · 만리장성</p>
            <span>중국 베이징</span><br />
            <span>⭐ 4.9</span>

            <h3>$53</h3>
          </div>
        </div>

        <div className="package-card">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
            alt="travel"
          />

          <div className="package-content">
            <h2>양쯔강 크루즈</h2>
            <p>충칭 · 이창 · 상해</p>
            <span>중국 충칭</span><br />
            <span>⭐ 4.5</span>

            <h3>$77</h3>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
