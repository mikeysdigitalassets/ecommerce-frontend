import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  user: any;
};

const Cart = ({ cartItems, setCartItems, user }: CartProps) => {
  
  const [quantitiesToRemove, setQuantitiesToRemove] = useState<{ [key: number]: number }>(
    () =>
      cartItems.reduce((acc, item) => {
        acc[item.productId] = 1; // sets default quantity to 1
        return acc;
      }, {} as { [key: number]: number })
  );





  
  const router = useRouter();
  

  useEffect(() => {
    const updatedQuantities = cartItems.reduce((acc, item) => {
      acc[item.productId] = quantitiesToRemove[item.productId] || 1; // sets the default quant to 1
      return acc;
    }, {} as { [key: number]: number });

    setQuantitiesToRemove(updatedQuantities);
  }, [cartItems]);

  const handleRemove = (productId: number, quantityToRemove: number) => {
    console.log("Product ID:", productId);
    console.log("Quantity to Remove:", quantityToRemove);
    
    setCartItems((prevItems) => {
      const updatedCart = prevItems
        .map((item) => {
          if (item.productId === productId) {
            const newQuantity = item.quantity - quantityToRemove;
            if (newQuantity > 0) {
              return { ...item, quantity: newQuantity };
            }
            return null; 
          }
          return item;
        })
        .filter((item) => item !== null) as CartItem[]; 
  
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // save cart to loc storage
      return updatedCart;
    });
  
    // call to backend to remove item from cart
    axios.delete("http://localhost:5000/api/cart/remove", {
      data: { userId: user.id,  productId  , quantityToRemove },
      withCredentials: true
    })
    .then(response => console.log("Item removed:", response))
    .catch(error => console.error("Error removing item from cart:", error));
  };
  
  
  
  

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setQuantitiesToRemove((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };
  

  const calculateTotal = (): string => {
    return cartItems
      .reduce((total, item) => {
        const price = item.price ?? 0; // 0 if undefined or null
        const quantity = item.quantity ?? 1; // 1 if undefined or null
        return total + price * quantity;
      }, 0)
      .toFixed(2); 
  };
  

  const handleCheckout = () => {
    if (user) {
      router.push("/checkout"); // if its a logged in user redirect to checkout
    } else {
      router.push("/login?checkout=true"); // if not logged in pass `checkout=true` to the login page with option to checkout as guest
    }
  };
  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`, {
          withCredentials: true
        });
        setCartItems(response.data); 
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    if (user) {
      fetchCartItems(); // get cart items only if the user is logged in
    }
  }, [user, setCartItems]); 
  

  return (
    <div className="flex-1 p-6 bg-blue-100 overflow-x-hidden">
      <div
        className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-full"
        style={{ marginLeft: "calc(16rem + 1rem)", maxWidth: "calc(100% - 17rem)" }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 relative">
          <span className="block text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Shopping Cart
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
        </h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 justify-items-center">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white shadow-md rounded-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
                style={{ maxWidth: "240px", margin: "0 auto" }}
              >
                <img
                  src={`https://picsum.photos/300/150?random=${Math.floor(Math.random() * 300)}`}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-500 mt-1">Price: ${item.price?.toFixed(2) ?? 'N/A'}</p>
                  <p className="text-gray-500 mt-1">Cart Quantity: {item.quantity ?? 'N/A'}</p>


                  
                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => handleQuantityChange(item.productId, quantitiesToRemove[item.productId] - 1)}
                      className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantitiesToRemove[item.productId]}
                      onChange={(e) =>
                        handleQuantityChange(item.productId, parseInt(e.target.value))
                      }
                      className="w-12 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.productId, quantitiesToRemove[item.productId] + 1)}
                      className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.productId, quantitiesToRemove[item.productId])}  // remeber to use item.productId for backend matching, you keep forgetting this
                    className="mt-3 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                    Remove
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="text-right mt-8">
            <h2 className="text-3xl font-bold text-gray-800">Total: ${calculateTotal()}</h2>
            <button 
              onClick={() => handleCheckout()}
              className="mt-4 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
