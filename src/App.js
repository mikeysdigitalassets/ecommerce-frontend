import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Products from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <div className="flex h-[100vh] w-[100vw]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <Header />

          {/* Page content */}
          <div className="flex-grow bg-gray-100 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
