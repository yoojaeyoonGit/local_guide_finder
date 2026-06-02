import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// main 브랜치 컴포넌트
import TravelerMain from './components/TravelerMain';
import ProfileEdit from './components/ProfileEdit';
import ProductSelection from './components/ProductSelection';
import GuideMain from './components/GuideMain';
import ChatPage from './components/ChatPage';
import BoardPage from './components/BoardPage';
import BoardDetail from './components/BoardDetail';

// feature/frontend-ui 브랜치 컴포넌트
import PackageEdit from './PackageEdit';
import PackageEdit2 from './PackageEdit2';
import PackageEdit3 from './PackageEdit3';
import Pay from './Pay';
import Refund from './Refund';

const AppContent = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* main 라우트 */}
        <Route path="/" element={<TravelerMain />} />
        <Route path="/guide" element={<GuideMain />} />
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/Product-selection" element={<ProductSelection />} />
        <Route path="/board/detail" element={<BoardDetail />} />

        {/* feature/frontend-ui 라우트 */}
        <Route path="/package-edit" element={<PackageEdit />} />
        <Route path="/package-edit2" element={<PackageEdit2 />} />
        <Route path="/package-edit3" element={<PackageEdit3 />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;