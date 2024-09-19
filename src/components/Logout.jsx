import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({user,setUser}) => {
//   const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  
  const handleLogout = async (e) => {
    e.preventDefault();

    setUser(false);
    navigate("/");

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 w-full">
      <form onSubmit={handleLogout} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Register</h2>


        {/* <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div> */}
        
        <button
          type="submit"
          className="w-full py-2 mt-4 rounded bg-blue-600 hover:bg-blue-500 transition duration-300 text-white"
        >
          Log in!
        </button>
      </form>
    </div>
  );
};

export default Logout;
