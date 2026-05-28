import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconPin, IconGrid, IconTable, IconChevronDown, IconLogout } from './icons';
import { authUtils } from '../../utils/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userData] = useState<{ fullName?: string; username?: string; email?: string } | null>(authUtils.getUserData());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authUtils.clearAuth();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const getUserInitials = () => {
    if (userData?.fullName) {
      return userData.fullName.charAt(0).toUpperCase();
    }
    if (userData?.username) {
      return userData.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const getUserEmail = () => {
    return userData?.email || 'user@example.com';
  };

  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path.startsWith('/dashboard/scrape')) return 'scrape';
    return 'dashboard';
  };

  const activePage = getActivePage();

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'scrape':
        navigate('/dashboard/scrape');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-8">
      <div className="max-w-screen-xl mx-auto h-14 flex items-center gap-6">
        {/* Logo */}
        <button
          onClick={() => handleNavigate("dashboard")}
          className="flex items-center gap-2 shrink-0 focus:outline-none"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <IconPin className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <span className="font-semibold text-sm text-gray-900">LocalFinder</span>
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1 flex-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: <IconGrid className="w-3.5 h-3.5" /> },
            { id: "scrape",    label: "Scrape",    icon: <IconTable className="w-3.5 h-3.5" /> },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => handleNavigate(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition duration-150 focus:outline-none ${
                activePage === id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* User */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{getUserInitials()}</span>
            </div>
            <span className="hidden sm:block text-sm text-gray-700">{getUserEmail()}</span>
            <IconChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{userData?.fullName || userData?.username || 'User'}</p>
                <p className="text-xs text-gray-500">{getUserEmail()}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <IconLogout className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;