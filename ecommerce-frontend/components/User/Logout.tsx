import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../Context/UserContext"; // Import the useUser hook

const Logout: React.FC = () => {
  const { setUser } = useUser(); // Destructure only setUser since user is not used in this component
  const router = useRouter(); // Initialize useRouter inside the component

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      // Send the logout request to the backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Successfully logged out
        setUser(null); // Set the user to null to clear the global state
        router.push("/"); // Redirect to home page or login page
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
