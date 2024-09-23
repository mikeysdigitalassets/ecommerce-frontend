import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = ({user,setUser}) => {
  
  const navigate = useNavigate();
  
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // Send the logout request to the backend
      const response = await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      if (response.status === 200) {
        // Successfully logged out
        setUser(null); // or setUser(false) depending on your use case
        navigate("/"); // Redirect to home page or login page
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}; 

export default Logout;
