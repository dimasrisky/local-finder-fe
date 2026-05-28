import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconPin, IconGrid, IconTable, IconChevronDown } from './icons';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path.startsWith('/scrape')) return 'scrape';
    return 'dashboard';
  };

  const activePage = getActivePage();

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'scrape':
        navigate('/scrape');
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
        <button className="flex items-center gap-2 focus:outline-none">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">Q</span>
          </div>
          <span className="hidden sm:block text-sm text-gray-700">QSq@gmail.com</span>
          <IconChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;