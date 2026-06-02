import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardPage.css';

const BoardPage = () => {
  const navigate = useNavigate();
  const posts = [
    { id: 1, title: '25일 가이드 모집합니다', desc: '간단하게 지역 소개해 주실 가이드 모집합니다', date: '2026.05.30' },
    { id: 2, title: '식당 함께 갈 분 모집합니다', desc: '현지 맛집 같이 가실 분 구해요', date: '2026.05.29' },
    { id: 3, title: '야경 투어 가이드 구함', desc: '저녁 7시 이후 투어 가능하신 분', date: '2026.05.28' }
  ];

  return (
    <div className="board-container">
      <div className="board-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2 className="board-title">게시판</h2>
        <button className="write-btn">글쓰기</button>
      </div>

      <div className="post-list">
        {posts.map(post => (
          /* onClick 부분을 App.jsx의 경로인 /board/detail로 연결했습니다 */
          <div 
            key={post.id} 
            className="post-item" 
            onClick={() => navigate('/board/detail')}
          >
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
            </div>
            <span className="post-date">{post.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;