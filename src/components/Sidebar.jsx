import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 flex flex-col p-4 pt-20">
      {/* Navigation Links */}
      <nav className="flex flex-col">
        <Link
          to="/"
          className="block py-3 px-4 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300"
        >
          Products
        </Link>
        <Link
          to="/cart"
          className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300"
        >
          Cart
        </Link>
        <Link
          to="/orders"
          className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300"
        >
          Orders
        </Link>
        <Link
          to="/profile"
          className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300"
        >
          Profile
        </Link>
        <Link
          to="/settings"
          className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
