import React, { useState, useEffect } from "react";
import axios from "axios";
import StatusBanner from "../Structure/StatusBanner"; 


type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type ProductsProps = {
  addToCart: (product: Product, quantity: number) => void;
};

const ProductList = ({ addToCart }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [bannerMessage, setBannerMessage] = useState<string>(""); 
  const [bannerType, setBannerType] = useState<'success' | 'error'>('success'); 
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false); 
  const api = 'http://localhost:5000/api/products';

  useEffect(() => {
    axios.get(api)
      .then(response => {
        console.log('Fetched products:', response.data); 
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the product list!", error);
      });
  }, []);

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
    setBannerMessage(`Added ${quantity} ${product.name} to cart successfully!`);
    setBannerType('success');
    setIsBannerVisible(true);
  };

  return (
    <div className="flex-1 p-6 bg-blue-100 overflow-x-hidden">
      <div
        className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-full"
        style={{ marginLeft: "calc(16rem + 1rem)", maxWidth: "calc(100% - 17rem)" }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 relative">
          <span className="block text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Our Products
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 justify-items-center">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
              style={{ maxWidth: "240px", margin: "0 auto" }}
            >
              <img
                src={`https://picsum.photos/300/150?random=${Math.floor(Math.random() * 300)}`}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500 mt-1">Price: ${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(product, 1)} 
                  className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
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
