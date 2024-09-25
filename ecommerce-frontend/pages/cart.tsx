// pages/cart.tsx
import React, { useState, useEffect } from 'react';
import Cart from '../components/Products/Cart'; // Import the Cart component
import { CartItem } from '../types'; // Import the type definition if it's in a separate file

// Define the CartItem type locally if it's not available from a separate file
// type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// };

const CartPage: React.FC = () => {
  // Initialize cartItems state and setCartItems function
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Return the Cart component with cartItems and setCartItems passed as props
  return (
    <div>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default CartPage;
