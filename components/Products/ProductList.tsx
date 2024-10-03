import React, { useState, useEffect } from "react";
import axios from "axios";
import StatusBanner from "../Structure/StatusBanner";
import { useUser } from "../Context/UserContext";  // this is user hook, used to get info of user

type Product = {
  id: number;
  name: string; // forgot to put name and price in backend cartItem DTO so orders in the cart were missing that info, added now
  price: number;
  quantity: number;
};

const ProductList = () => {
  const { user } = useUser();  
  const [products, setProducts] = useState<Product[]>([]);
  const [bannerMessage, setBannerMessage] = useState<string>("");
  const [bannerType, setBannerType] = useState<'success' | 'error'>('success');
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // remember that this tracks the number of products
  const api = 'http://localhost:5000/api/products';

  useEffect(() => {
    axios.get(api)
      .then(response => {
        console.log('Fetched products:', response.data);
        setProducts(response.data);
        const initialQuantities = response.data.reduce((acc: { [key: number]: number }, product: Product) => {
          acc[product.id] = 1; // product quantity to 1
          return acc;
        }, {});
        setQuantities(initialQuantities);
      })
      .catch(error => {
        console.error("There was an error fetching the product list!", error);
      });
  }, []);

  const handleAddToCart = async (product: Product) => {
    const quantity = quantities[product.id];

    if (!user) {
      setBannerMessage("You must be logged in to add items to the cart.");
      setBannerType('error');
      setIsBannerVisible(true);
      return;
    }

    try {
      const payload = {
        userId: user.id,  // using the user id from the user context, nessary for interacting with cart functionality
        productId: product.id,
        quantity: quantity,
        price: product.price,
        name: product.name
      };

      console.log("Payload being sent to the backend:", payload); // log i will keep just incase

      await axios.post('http://localhost:5000/api/cart/add', payload, { withCredentials: true });

      setBannerMessage(`Added ${quantity} ${product.name} to cart successfully!`);
      setBannerType('success');
      setIsBannerVisible(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setBannerMessage("Failed to add item to cart.");
      setBannerType('error');
      setIsBannerVisible(true);
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity   // do not mess with this function, you keep confusing yourself, you have this working just fine
    }));
  };

  return (
    <div className="flex-1 p-6 bg-blue-100 overflow-x-hidden">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-full" style={{ marginLeft: "calc(16rem + 1rem)", maxWidth: "calc(100% - 17rem)" }}>
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 relative">
          <span className="block text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Our Products
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 justify-items-center">
          {products.map(product => (
            <div key={product.id} className="bg-white shadow-md rounded-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg" style={{ maxWidth: "240px", margin: "0 auto" }}>
              <img src={`https://picsum.photos/300/150?random=${Math.floor(Math.random() * 300)}`} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 mt-1">Price: ${product.price.toFixed(2)}</p>
                <div className="mt-2">
                  <label htmlFor={`quantity-${product.id}`} className="text-sm text-gray-600">Quantity:</label>
                  <input
                    id={`quantity-${product.id}`}
                    type="number"
                    min="1"
                    value={quantities[product.id]}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="border rounded w-full mt-1 px-2 py-1 text-center"
                  />
                </div>
                <button onClick={() => handleAddToCart(product)} className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isBannerVisible && (
        <StatusBanner
          message={bannerMessage}
          type={bannerType}
          onClose={() => setIsBannerVisible(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
