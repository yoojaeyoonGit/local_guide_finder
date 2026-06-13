import React, { useState, useEffect } from 'react'; // 1. useState, useEffect 추가
import { useNavigate } from 'react-router-dom';
import './BoardDetail.css';
import { apiFetch } from '../api/client';


const BoardDetail = () => {
  const navigate = useNavigate();
  
  const [boardData, setBoardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. API 호출 및 JSON 변환을 처리하는 apiFetch 함수
  const BoardDataFetch = async () => {
    try {
      // 실제 API 엔드포인트로 요청 (예시로 /api/v1/board/1 형태일 가능성이 높음)
      const response = await apiFetch('/api/v1/board/posts/'); 
      
      const rawText = await response.text(); 
      const jsonData = JSON.parse(rawText); // 문자열을 JSON 객체로 변환
      
      setBoardData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      setIsLoading(false);
    }
  };

  // 4. 컴포넌트가 마운트될 때 apiFetch 함수 실행
  useEffect(() => {
    BoardDataFetch();
  }, []);

  // 로딩 중일 때 보여줄 화면
  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  // 데이터가 없을 때 예외 처리
  if (!boardData) {
    return <div className="error">게시글을 불러올 수 없습니다.</div>;
  }

  return (
    <div className="board-detail-container">
      {/* 상단 헤더: 제목과 편집 버튼 */}
      <div className="detail-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
        <h2>{boardData.title}</h2> {/* 동적 데이터 반영 */}
        <button className="edit-badge">편집</button>
      </div>

      {/* 이미지 갤러리 영역 */}
      <div className="image-gallery">
        {/* API에서 이미지 배열을 줄 경우를 가정 (없으면 기본 배열 사용) */}
        {(boardData.images || [1, 2, 3, 4, 5]).map((item, index) => (
          <div key={index} className="gallery-item">
            <img src={item.url || "https://picsum.photos/200/200?random=1"} alt="gallery" />
          </div>
        ))}
      </div>

      {/* 게시글 본문 영역 */}
      <div className="content-section">
        <div className="content-title">
          <span className="label">제목 | </span> {boardData.title} {/* 동적 데이터 반영 */}
        </div>
        <div className="content-body">
          <p className="label">내용</p>
          <div className="text-box">
            {boardData.content} {/* 동적 데이터 반영 */}
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
          {/* 댓글 목록 동적 렌더링 */}
          {boardData.comments && boardData.comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <strong>{comment.author}</strong>
              <p>{comment.text}</p>
            </div>
          ))}
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
