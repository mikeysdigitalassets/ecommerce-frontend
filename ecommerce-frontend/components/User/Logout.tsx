import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../Context/UserContext"; 

const Logout: React.FC = () => {
  const { setUser } = useUser(); 
  const router = useRouter(); 

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        
        setUser(null); 
        router.push("/"); 
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  );
};

export default Logout;
