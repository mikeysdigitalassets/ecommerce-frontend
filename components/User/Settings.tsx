import React, {  useState } from "react";
import { useUser } from '../Context/UserContext';
import Link from 'next/link';

const Settings = () => {
    const { user } = useUser();

    if (!user) {
        return <div>Loading...</div>; // Safeguard to avoid errors when user context isn't ready
      }
    return (
        
        <div className="pt-4">
        <h1 className="text-2xl font-bold text-center">Account Settings</h1>
        <h1 className="text-2xl font-bold text-center">Welcome { user ? user.username : null}</h1>
        

        <div className="flex flex-col items-center mt-10 min-h-screen bg-gray-100">
      {/* <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full text-center"> */}
        <h1 className="text-2xl font-bold text-gray mb-4">
         
        <Link href="/addshipping">
          <span className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300">
            Add shipping address
          </span>
        </Link>
        </h1>



        
        <p className="text-lg text-gray-600 mb-8">
          
          {user && (
            <>
              <span>Your email is: {user.email}</span>
              
            </>
          )}
        </p>
        
        </div>
    //   </div>
    )
}

export default Settings;