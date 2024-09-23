import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout"; // Import the Logout component
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("Logout button clicked"); // Confirm that the logout button is clicked
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {}, 
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        console.log("Logout successful");
        setUser(null); // Clear user state
        localStorage.removeItem('user'); // Remove user from localStorage
        navigate("/"); // Redirect to home page
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
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/null" className="hover:text-gray-400">About</Link>
          {user === null ? (
            <>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
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
