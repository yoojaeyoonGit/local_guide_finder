import React, { useState } from 'react'; // useState 추가
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import TravelerMain from './components/TravelerMain';
import ProfileEdit from './components/ProfileEdit';
import ProductSelection from './components/ProductSelection';
import GuideMain from './components/GuideMain';
import ChatPage from './components/ChatPage';
import BoardPage from './components/BoardPage';
import BoardDetail from './components/BoardDetail';



// 1. 실제 메인 로직을 담은 컴포넌트 (Router의 자식)
const AppContent = () => {
  // 이제 Router 안에서 실행되므로 useNavigate를 사용할 수 있습니다.
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 예시 상태

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<TravelerMain />} />
        <Route path="/guide" element={<GuideMain />} />
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/Product-selection" element={<ProductSelection />} />
        <Route path="/board/detail" element={<BoardDetail />} />

        {/* ... 다른 라우트들 */}
      </Routes>
    </div>
  );
};

// 2. 최상위 App 컴포넌트 (Router로 감싸는 역할만 수행)
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
