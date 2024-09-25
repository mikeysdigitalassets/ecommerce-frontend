import React, { useState } from "react";

// Define the types for the CartItem and the props
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
  // Handle removing items from the cart
  const handleRemove = (productId: number, quantityToRemove: number) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity - quantityToRemove;
            if (newQuantity > 0) {
              return { ...item, quantity: newQuantity };
            }
            return null; // Mark item for removal
          }
          return item;
        })
        .filter((item) => item !== null) as CartItem[]; // Remove items with null

      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to local storage
      return updatedCart;
    });
  };

  // Calculate the total price of the cart items
  const calculateTotal = (): string => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // State to manage the quantity to be removed for each item
  const [quantitiesToRemove, setQuantitiesToRemove] = useState<{ [key: number]: number }>(
    () =>
      cartItems.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {} as { [key: number]: number })
  );

  // Handle quantity change
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantitiesToRemove((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    }
  };

  return (
    <div className="flex-1 p-6 bg-blue-100 overflow-x-hidden">
      {/* Background matching other components */}
      <div
        className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-full"
        style={{ marginLeft: "calc(16rem + 1rem)", maxWidth: "calc(100% - 17rem)" }}
      >
        {/* Enhanced "Shopping Cart" Heading */}
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
            {/* Grid layout for items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
                style={{ maxWidth: "240px", margin: "0 auto" }} // Adjusted width and centered
              >
                <img
                  src={`https://picsum.photos/300/150?random=${Math.floor(Math.random() * 300)}`}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />{" "}
                {/* Adjusted image size */}
                <div className="p-4">
                  {" "}
                  {/* Reduced padding */}
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-500 mt-1">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>

                  {/* Quantity Updater for Removing */}
                  <div className="flex items-center mt-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, quantitiesToRemove[item.id] - 1)}
                      className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantitiesToRemove[item.id]}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-12 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, quantitiesToRemove[item.id] + 1)}
                      className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id, quantitiesToRemove[item.id])}
                    className="mt-3 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  >
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
            <button className="mt-4 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
