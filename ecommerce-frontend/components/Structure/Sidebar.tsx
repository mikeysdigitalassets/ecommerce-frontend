import React from 'react';
import Link from 'next/link';
import { useUser } from '../Context/UserContext';
import { useCart, CartProvider } from '../Context/CartContext'; 




const Sidebar = () => {
  const { cartItems } = useCart(); 
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

  console.log('Cart Items:', cartItems); 
console.log('Total Items in Cart:', totalItems);

  return (
    <aside className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 p-4">
      
      <nav className="flex flex-col">
        <Link href="/">
          <span className="block py-3 px-4 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300">
            Home
          </span>
        </Link>
        <Link href="/products">
          <span className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300">
            Products
          </span>
        </Link>
        <Link href="/cart">
          <span className="relative block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300">
            <span>Cart</span>
            <span className="ml-2">🛒</span>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 mt-1 mr-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </span>
        </Link>
        <Link href="/profile">
          <span className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300">
            Profile
          </span>
        </Link>
        <Link href="/settings">
          <span className="block py-3 px-4 mt-3 rounded-lg bg-gray-700 shadow-md hover:bg-gray-600 transition duration-300">
            Settings
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
