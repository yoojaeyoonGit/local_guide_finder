import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './Login';
import SignUp from './SignUp';

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
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 보호 라우트 */}
        <Route path="/" element={<PrivateRoute><TravelerMain /></PrivateRoute>} />
        <Route path="/guide" element={<PrivateRoute><GuideMain /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
        <Route path="/board" element={<PrivateRoute><BoardPage /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="/Product-selection" element={<PrivateRoute><ProductSelection /></PrivateRoute>} />
        <Route path="/board/detail" element={<PrivateRoute><BoardDetail /></PrivateRoute>} />
        <Route path="/package-edit" element={<PrivateRoute><PackageEdit /></PrivateRoute>} />
        <Route path="/package-edit2" element={<PrivateRoute><PackageEdit2 /></PrivateRoute>} />
        <Route path="/package-edit3" element={<PrivateRoute><PackageEdit3 /></PrivateRoute>} />
        <Route path="/pay" element={<PrivateRoute><Pay /></PrivateRoute>} />
        <Route path="/refund" element={<PrivateRoute><Refund /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
