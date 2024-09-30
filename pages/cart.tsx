import React, { useState, useEffect, useContext } from 'react';
import Cart from '../components/Products/Cart'; 
import { CartItem } from '../types'; 
import { UserContext } from '../components/Context/UserContext';

const CartPage = () => {
  const userContext = useContext(UserContext); // Handle undefined UserContext
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Ensure userContext is not undefined before accessing user
  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user } = userContext;

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div>
      <Cart user={user} cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default CartPage;
