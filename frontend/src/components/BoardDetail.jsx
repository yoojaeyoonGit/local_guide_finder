import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardDetail.css';

const BoardDetail = () => {
  const navigate = useNavigate();

  

  return (
    <div className="board-detail-container">
      {/* 상단 헤더: 제목과 편집 버튼 */}
      <div className="detail-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
        <h2>25일 가이드 모집합니다</h2>
        <button className="edit-badge">편집</button>
      </div>

      {/* 이미지 갤러리 영역 */}
      <div className="image-gallery">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="gallery-item">
            <img src="https://picsum.photos/200/200?random=1" alt="gallery" />
          </div>
        ))}
      </div>

      {/* 게시글 본문 영역 */}
      <div className="content-section">
        <div className="content-title">
          <span className="label">제목 |</span> 25일 가이드 모집합니다
        </div>
        <div className="content-body">
          <p className="label">내용</p>
          <div className="text-box">
            중국 베이징의 핵심 관광지를 한 번에 만날 수 있는 특별한 패키지로, 
            황실의 웅장함이 살아 있는 자금성과 아름다운 황실 정원으로 유명한 이화원, 
            그리고 중국을 대표하는 세계적인 문화유산 만리장성까지 둘러보며 
            베이징의 역사와 문화를 깊이 있게 체험할 수 있는 알찬 여행 상품입니다. 
            전문 가이드와 함께 이동하며 중국 황실 문화와 용장한 자연 경관을 
            동시에 즐길 수 있어 가족, 친구, 연인 모두에게 추천되는 인기 코스입니다.
          </div>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="comment-section">
        <p className="label">댓글</p>
        <div className="comment-input-wrapper">
          <textarea placeholder="댓글 작성하는 textarea"></textarea>
          <button className="btn-comment-submit">등록</button>
        </div>
        <div className="comment-list">
          <div className="comment-item">
            <strong>당근치킨</strong>
            <p>가이드 가능합니다 채팅드리겠습니다</p>
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="detail-footer-actions">
        <button className="btn-like">👍</button>
        <button className="btn-chat-start" onClick={() => navigate('/chat')}>채팅하기</button>
      </div>


    </div>
  );
};

export default BoardDetail;
