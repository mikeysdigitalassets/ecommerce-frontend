// components/Home.tsx
import React from 'react';
import { useUser } from '../Context/UserContext'; // Adjust the import path if needed

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {/* Display specific properties of the user object */}
          Welcome, {user ? user.username : "Guest"}!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {/* Optionally, display other user information */}
          {user && (
            <>
              <span>Your email is: {user.email}</span>
              {/* You can add more user-related details here */}
            </>
          )}
        </p>
        
        </div>
      </div>
    
  );
};

export default Home;
