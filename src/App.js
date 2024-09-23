import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Products from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Register from './components/Register';
import Login from './components/Login';
import Logout from "./components/Logout";

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    
    <Router>
      <div className="flex h-[100vh] w-[100vw]">
      
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <Header user={user} setUser={setUser} />
          {/* <Logout user={user} setUser={setUser} /> */}
          {/* Page content */}
          <div className="flex-grow bg-gray-100 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/register" element={<Register user={user} setUser={setUser} />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} />} />
              
              {/* <Route path="/cart" element={<Cart />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
