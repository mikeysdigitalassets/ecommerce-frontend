import React, { useState, useEffect } from 'react';
import ProductList from '../components/Products/ProductList'; 


type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const ProductListPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);


  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);


  useEffect(() => {
    console.log('Updated cartItems:', cartItems); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

 
  const addToCart = (product: CartItem, quantity: number): void => {
    console.log('Attempting to add product with id:', product.id);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
  
      if (existingItem) {
        console.log('Item already in cart. Updating quantity for:', existingItem);
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('Updated cart items:', updatedItems);
        return updatedItems;
      } else {
        
        const newItems = [...prevItems, { ...product, quantity }];
        console.log('Adding new item to cart:', newItems);
        return newItems;
      }
    });
  };
  
  

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-4">Product List Page</h1>
      <ProductList addToCart={addToCart} /> {/* Pass the addToCart function as a prop */}
    </div>
  );
};

export default ProductListPage;
