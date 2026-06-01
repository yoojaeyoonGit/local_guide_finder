import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // GuideMain에서 navigate할 때 보낸 state를 확인합니다.
  const isGuide = location.state?.isGuide || false;

  return (
    <div className="profile-edit-container">
      <h1 className="profile-header">프로필 수정</h1>
      
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-image-circle">
            <img src="https://picsum.photos/200" alt="profile" />
          </div>
          <button className="btn-photo-change">사진 변경</button>
          
          <div className="guide-reg-section">
            {isGuide ? (
              /* 가이드 메인에서 접속했을 때 (isGuide === true) */
              <div className="guide-cancel-wrapper">
                <p className="guide-status-text">
                  이미 가이드로 등록 되어있습니다.<br />
                  취소하시겠습니까?
                </p>
                <button className="btn-guide-cancel" onClick={() => {
                  alert('가이드 등록이 취소되었습니다.');
                  navigate('/'); 
                }}>
                  가이드 취소하기
                </button>
              </div>
            ) : (
              /* 여행자 메인에서 접속했을 때 (isGuide === false) */
              <button className="btn-guide-reg" onClick={() => alert('가이드로 등록되었습니다!')}>
                가이드 등록하기
              </button>
            )}
          </div>
        </div>

        <div className="profile-right">
          <div className="input-group">
            <label>이름</label>
            <input type="text" placeholder="이름을 입력하세요" />
          </div>
          <div className="input-group">
            <label>이메일</label>
            <input type="email" placeholder="example@mail.com" />
          </div>
          <div className="input-group">
            <label>비밀번호</label>
            <input type="password" placeholder="********" />
          </div>
          <div className="location-row">
            <div className="input-group">
              <label>사는 곳(나라)</label>
              <input type="text" placeholder="나라" />
            </div>
            <div className="input-group">
              <label>도시</label>
              <input type="text" placeholder="도시" />
            </div>
          </div>
          <div className="input-group">
            <label>사용 가능 언어</label>
            <input type="text" placeholder="예: 한국어, 영어" />
          </div>
        </div>
      </div>

      <div className="profile-footer-buttons">
        <button className="btn-save" onClick={() => alert('저장되었습니다.')}>저장</button>
        <button className="btn-cancel" onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  );
};

export default ProfileEdit;
