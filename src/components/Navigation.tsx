
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#' },
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '#' }
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-white font-satoshi font-bold text-2xl">
          Nomad
        </Link>
        
        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-1 bg-white rounded-full px-2 py-2">
          {navItems.map((item, index) => (
            item.path === '#' ? (
              <button
                key={item.name}
                className={`px-6 py-2 rounded-full font-satoshi font-medium text-sm transition-all duration-200 ${
                  index === 0 && location.pathname === '/'
                    ? 'bg-sage-500 text-white' 
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`px-6 py-2 rounded-full font-satoshi font-medium text-sm transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-sage-500 text-white' 
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
