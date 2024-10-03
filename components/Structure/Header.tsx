import React from "react";
import Link from "next/link"; 
import axios from "axios";
import { useRouter } from "next/router"; 
import { useUser } from '../Context/UserContext';
import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Header = () => {
  const { user, setUser } = useUser();
  const router = useRouter(); 

  const notify = (message: string, type: TypeOptions) => {
    const options: ToastOptions = { type, autoClose: 5000};
    toast(message, options);
  }



  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {}, 
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        console.log("Logout successful");
        setUser(null); 
        router.push("/"); 
        notify('logout successful', 'success');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <header className="bg-gray-800 text-white w-full fixed top-0 left-0 z-10 h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-4">
        
        <div className="text-2xl font-bold">TechGear.com</div>

        
        <nav className="flex space-x-6 ml-8">
          
          {/* will add visibilty of links depending on user status user and !user */ }
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
