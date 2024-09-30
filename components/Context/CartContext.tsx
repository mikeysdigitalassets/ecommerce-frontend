import React, { createContext, useContext, useState, ReactNode } from 'react';


type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: CartItem, quantity: number) => void;
  removeFromCart: (productId: number, quantity?: number) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > quantity) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - quantity }
            : item
        );
      } else {
        return prevItems.filter(item => item.id !== productId);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
