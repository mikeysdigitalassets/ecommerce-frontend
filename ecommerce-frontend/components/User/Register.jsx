import React, { useState } from "react";
import axios from "axios";

const Register = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
        setError("All fields are required");
        return;
    }

    try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
            username,
            email,
            password
        });

        if (response.status === 200) {
            setSuccess("Registration successful");
            setError(null);
        }
    } catch (err) {
        if (err.response && err.response.status === 400) {
            setError(err.response.data); // Display backend error message (e.g., "Username is already taken")
        } else {
            setError("An error has occurred. Please try again later.");
        }
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 w-full">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Register</h2>

        {/* Display error or success message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            required
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
