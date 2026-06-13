import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
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
import DashBoard from './DashBoard';


const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 보호 라우트 */}
        <Route path="/" element={<PrivateRoute><Layout><TravelerMain /></Layout></PrivateRoute>} />
        <Route path="/guide" element={<PrivateRoute><Layout><GuideMain /></Layout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Layout><ProfileEdit /></Layout></PrivateRoute>} />
        <Route path="/board" element={<PrivateRoute><Layout><BoardPage /></Layout></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Layout><ChatPage /></Layout></PrivateRoute>} />
        <Route path="/Product-selection" element={<PrivateRoute><Layout><ProductSelection /></Layout></PrivateRoute>} />
        <Route path="/board/detail" element={<PrivateRoute><Layout><BoardDetail /></Layout></PrivateRoute>} />
        <Route path="/package-edit" element={<PrivateRoute><Layout><PackageEdit /></Layout></PrivateRoute>} />
        <Route path="/package-edit2" element={<PrivateRoute><Layout><PackageEdit2 /></Layout></PrivateRoute>} />
        <Route path="/package-edit3" element={<PrivateRoute><Layout><PackageEdit3 /></Layout></PrivateRoute>} />
        <Route path="/pay" element={<PrivateRoute><Layout><Pay /></Layout></PrivateRoute>} />
        <Route path="/refund" element={<PrivateRoute><Layout><Refund /></Layout></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Layout><DashBoard /></Layout></PrivateRoute>} />

        
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
