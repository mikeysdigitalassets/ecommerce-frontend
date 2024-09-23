import React, { useState, useEffect } from "react";

const Cart = ({ cartItems, setCartItems }) => {
  const handleRemove = (productId) => {
    // Remove item from cart
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    // Save updated cart to local storage if not authenticated
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center p-4 bg-white shadow mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <h2 className="text-xl font-bold">Total: ${calculateTotal()}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
