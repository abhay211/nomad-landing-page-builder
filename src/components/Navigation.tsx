
import React from 'react';

const Navigation = () => {
  const navItems = ['Home', 'About', 'Features', 'How It Works'];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-white font-satoshi font-bold text-2xl">
          Nomad
        </div>
        
        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-2">
          {navItems.map((item, index) => (
            <button
              key={item}
              className={`px-6 py-2 rounded-full font-satoshi font-medium text-sm transition-all duration-200 ${
                index === 0 
                  ? 'bg-sage-500 text-white' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
