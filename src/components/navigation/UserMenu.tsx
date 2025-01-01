import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { authService } from '../../services/auth';
import { useState } from 'react';

export function UserMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      // Always navigate to landing page after logout attempt
      navigate('/landing', { replace: true });
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
        disabled={isLoggingOut}
        className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut className="h-5 w-5 inline-block mr-1" />
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
}