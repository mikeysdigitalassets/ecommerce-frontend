import React from "react";
import Link from "next/link"; // Use Next.js Link component
import axios from "axios";
import { useRouter } from "next/router"; // Use Next.js router for navigation
import { useUser } from '../Context/UserContext';

// Define the props types for the component


const Header: React.FC = () => {
  const { user, setUser } = useUser();
  const router = useRouter(); // Use Next.js router

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {}, 
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        console.log("Logout successful");
        setUser(null); // Clear user state
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <header className="bg-gray-800 text-white w-full fixed top-0 left-0 z-10 h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-4">
        {/* Site name (aligned to the far left) */}
        <div className="text-2xl font-bold">MySite</div>

        {/* Navigation Links (closer to the site name) */}
        <nav className="flex space-x-6 ml-8">
          {/* Updated Link usage without <a> tags */}
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
          {user === null ? (
            <>
              <Link href="/register" className="hover:text-gray-400">
                Register
              </Link>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:text-gray-400">
              Logout
            </button>
          )}
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
