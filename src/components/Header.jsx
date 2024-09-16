import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white w-full fixed top-0 left-0 z-10 h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-4">
        
        {/* Site name (aligned to the far left) */}
        <div className="text-2xl font-bold">
          MySite
        </div>

        {/* Navigation Links (closer to the site name) */}
        <nav className="flex space-x-6 ml-8">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">About</a>
          <a href="#" className="hover:text-gray-400">FAQ</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </nav>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-4 pr-12 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none w-56"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
            🔍
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
