import React, { useState, useEffect } from 'react';
import Cart from '../components/Products/Cart'; 
import { CartItem } from '../types'; 



const CartPage: React.FC = () => {
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

 
  return (
    <div>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default CartPage;
