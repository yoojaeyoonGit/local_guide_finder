import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderIcons from './HeaderIcons';
import './TravelerMain.css';

const TravelerMain = () => {
  const navigate = useNavigate();
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('미국');

  const countries = ['미국', '일본', '중국', '베트남', '태국'];
  const regions = ['LA', '뉴욕', '시카고', '샌프란시스코', '시애틀'];

  return (
    <div className="traveler-main">
      <div className="top-nav">
        <button className="nav-btn active">여행자</button>
        <button className="nav-btn" onClick={() => navigate('/guide')}>가이드</button>
      </div>

      <HeaderIcons isGuide={false} />

      <h1 className="main-logo">GuideMe</h1>
      <p className="main-slogan">누구나 가이드가 될 수 있다</p>
      
      <div className="content-grid">
        {/* 관광 상품 찾기 */}
        <div className="section-card">
          <div className="section-header blue-header">관광 상품 찾기</div>
          <div className="section-body">
            {/* 1. 클릭 시 모달 열기 */}
            <div className="filter-select" onClick={() => setIsModalOpen(true)} style={{cursor: 'pointer'}}>
              국가/나라 선택 ▼
            </div>
            <div className="inner-card product-card" onClick={() => navigate('/product-selection')}>
              <img src="https://picsum.photos/200" alt="product" className="img-placeholder" />
              <div className="card-info">
                <h3>베이징 관광 패키지</h3>
                <p>중국 베이징 / 2026.07.15</p>
                <span className="price">$53</span>
              </div>
            </div>  
          </div>
        </div>

        {/* 예약/진행된 매칭 */}
        <div className="section-card">
          <div className="section-header green-header">예약/진행된 매칭</div>
          <div className="section-body">
            <div className="tab-menu">
              <div className="tab active">예정</div>
              <div className="tab">완료</div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="inner-card matching-card" onClick={() => navigate('/chat')}>
                <div className="matching-content">
                  <img src="https://picsum.photos/200" alt="guide" className="thumb-img" />
                  <div>
                    <strong>도쿄 여행</strong>
                    <p>가이드: 김찬슬</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 게시판 */}
        <div className="section-card" onClick={() => navigate('/board')}>
          <div className="section-header orange-header">게시판</div>
          <div className="section-body">
            <div className="inner-card board-item">
              <strong>25일 가이드 모집합니다</strong>
              <p>간단하게 지역 소개해주실 </p>
              <p> 가이드분 모집합니다</p>
            </div>
            <div className="inner-card board-item">
              <strong>식당 함께 갈 분 모집합니다</strong>
              <p>간단하게 지역 소개해주실 </p>
              <p> 가이드분 모집합니다</p>
            </div>

            <div className="inner-card board-item">
              <strong>외국인 가이드 모집합니다</strong>
              <p>간단하게 지역 소개해주실 </p>
              <p> 외국인 가이드분 모집합니다</p>
            </div>

          </div>
        </div>
      </div>
      

      {/* --- 국가 선택 모달 레이어 --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>지역 선택</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="country-list">
                {countries.map(c => (
                  <div 
                    key={c} 
                    className={`country-item ${selectedCountry === c ? 'active' : ''}`}
                    onClick={() => setSelectedCountry(c)}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="region-grid">
                {regions.map(r => (
                  <button 
                    key={r} 
                    className="region-btn"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate('/product-selection');
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelerMain;