// components/Context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the user object
type User = {
  username: string;
  email: string;
};

// Define the context type
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Create the context with an initial value of undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider component to wrap the app and provide user data
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize the user state as null initially
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
