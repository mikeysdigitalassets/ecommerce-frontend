import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Orders from './components/Orders';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-col w-full ml-64"> {/* Ensure space for sidebar */}
          {/* Header */}
          <Header />

          {/* Page content */}
          <div className="p-6 flex-grow bg-gray-100 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
