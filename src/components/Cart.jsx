import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h3>
            <button
              onClick={onCheckout}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
