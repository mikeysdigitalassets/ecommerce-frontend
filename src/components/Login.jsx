import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({user,setUser}) => {
//   const [username, setUsername] = useState("");

    
    

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        setError("All fields are required");
        return;
    }

    

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {email, password}, 
      { withCredentials: true }
    );

    if (response.status === 200) {
      const userData = response.data; // Assuming the response contains user data
      setUser(userData); // Update user state
      localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
      navigate("/"); // Redirect to home page
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
 
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 w-full">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-4"></h2>

        {/* Display error or success message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

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
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>
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

export default Login;
