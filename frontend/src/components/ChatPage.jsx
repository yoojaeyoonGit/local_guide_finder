import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <span>채팅 목록</span>
        </div>
        <div className="chat-list-item active">여행자1 (베이징 패키지)</div>
        <div className="chat-list-item">여행자2 (도쿄 투어)</div>
      </div>
      <div className="chat-main">
        <div className="chat-header">여행자1</div>
        <div className="chat-messages">
          <div className="msg-row received">
            <div className="msg-bubble">안녕하세요! 가이드 예약 가능한가요?</div>
          </div>
          <div className="msg-row sent">
            <div className="msg-bubble">네, 가능합니다. 어떤 걸 도와드릴까요?</div>
          </div>
        </div>
        <div className="chat-input-area">
          <input type="text" placeholder="메시지를 입력하세요..." />
          <button className="send-btn">전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;