import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/client';
import './BoardPage.css';

const BoardPage = () => {

  const navigate = useNavigate();

  const [boardData, setBoardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBoard = async () => {
    try {
      const response = await apiFetch('/api/v1/board/posts/');

      const jsonData = await response.json();
      console.log(jsonData);

      setBoardData(jsonData);
      setIsLoading(false);

    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!boardData) {
    return <div className="error">게시글을 불러올 수 없습니다.</div>;
  }

  return (
    <div className="board-container">
      <div className="board-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h2 className="board-title">게시판</h2>
        <button className="write-btn">글쓰기</button>
      </div>

      <div className="post-list">
        {boardData.map(post => (
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