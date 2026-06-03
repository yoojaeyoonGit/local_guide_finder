import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HeaderIcons({ isGuide = false }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="header-right-icons">
      <div className="profile-icon" onClick={() => navigate('/profile', { state: { isGuide } })}>👤</div>
      <div className="settings-icon">⚙️</div>
      <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
