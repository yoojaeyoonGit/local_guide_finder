import { useNavigate } from 'react-router-dom';
import HeaderIcons from './HeaderIcons';
import './GuideMain.css';

const GuideMain = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-main">
      {/* 상단 탭 내비게이션 */}
      <div className="top-nav">
        <button className="nav-btn" onClick={() => navigate('/')}>여행자</button>
        <button className="nav-btn active">가이드</button>
      </div>

      {/* 우측 상단 아이콘 */}
      <HeaderIcons isGuide={true} />

      <h1 className="main-logo">GuideMe</h1>
      <p className="main-slogan">누구나 가이드가 될 수 있다</p>
      
      <div className="guide-content-grid">
        {/* 왼쪽: 내가 올려놓은 가이드 상품 */}
        <div className="guide-section-card">
          <div className="section-header dark-gray">내가 올려놓은 가이드 상품</div>
          <div className="section-body">
            
            {/* 가이드 스튜디오 이동 버튼 */}
            <button className="studio-btn" onClick={() => navigate('/dashboard')}>가이드 스튜디오 이동</button>


            <div className="inner-product-card">
              <div className="product-info-top">
                <img src="https://picsum.photos/200" alt="product" className="rect-img" />
                <div className="text-info">
                  <p className="prod-name">베이징 관광 패키지</p>
                  <p className="prod-price">$53</p>
                </div>
              </div>
              <button className="detail-view-btn" onClick={() => navigate('/package-edit')}>상세 페이지 이동</button>
            </div>
          </div>

          
          
        </div>

        {/* 중간: 상품별 대화창 */}
        <div className="guide-section-card">
          <div className="section-header dark-gray">상품별 대화창</div>
          <div className="section-body">
            <div className="chat-list-item" onClick={() => navigate('/chat')}>
              <img src="https://picsum.photos/200" alt="user" className="circle-thumb" />
              <div className="chat-text">
                <p>베이징 관광 패키지</p>
                <p className="user-name">여행자 1</p>
              </div>
            </div>
          </div>

          <div className="section-body">
            <div className="chat-list-item" onClick={() => navigate('/chat')}>
              <img src="https://picsum.photos/200" alt="user" className="circle-thumb" />
              <div className="chat-text">
                <p>베이징 관광 패키지</p>
                <p className="user-name">여행자 1</p>
              </div>
            </div>
          </div>

          <div className="section-body">
            <div className="chat-list-item" onClick={() => navigate('/chat')}>
              <img src="https://picsum.photos/200" alt="user" className="circle-thumb" />
              <div className="chat-text">
                <p>베이징 관광 패키지</p>
                <p className="user-name">여행자 1</p>
              </div>
            </div>
          </div>

        </div>

        

        {/* 오른쪽: 게시판 */}
        <div className="guide-section-card" onClick={() => navigate('/board')}>
          <div className="section-header orange-header">게시판</div>
          <div className="section-body">
            <div className="inner-board-card">
              <strong>25일 가이드 모집합니다</strong>
              <p>지역 소개해주실 가이드 모집합니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideMain;