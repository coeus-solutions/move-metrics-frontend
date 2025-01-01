import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { authService } from '../../services/auth';

export function UserMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/landing');
    } catch (error) {
      console.error('Logout failed:', error);
      // If the API call fails, still clear local storage and redirect
      localStorage.removeItem('token');
      navigate('/landing');
    }
  };

  return (
    <div className="flex items-center">
      <Link
        to="/profile"
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          location.pathname === '/profile' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <User className="h-5 w-5 inline-block mr-1" />
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        <LogOut className="h-5 w-5 inline-block mr-1" />
        Logout
      </button>
    </div>
  );
}