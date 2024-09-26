import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../Context/UserContext"; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser(); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const userData = response.data; 
        setUser(userData); 
        localStorage.setItem("user", JSON.stringify(userData)); 
        router.push("/"); 
        
        
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 w-full">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login</h2>

        
        {error && <p className="text-red-500 mb-4">{error}</p>}

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
