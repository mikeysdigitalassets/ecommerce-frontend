import React, { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const api = 'http://localhost:5000/api/products';
    // const img = <img src="https://picsum.photos/100/100"></img>

    

    useEffect(() => {
        axios.get(api)
        .then(response => {
            setProducts(response.data);
            
        })
        .catch(error => {
            console.error("There was an error fetching product list!", error);
        });
    }, []);

    

    return (
        <div className="container mx-auto pt-9">
          <h1 className="text-3xl font-bold mb-6">Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
            {products.map(product => (
               <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                   
                   {<img src={`https://picsum.photos/200/100?random=${Math.floor(Math.random() * 300)}`}></img>}
                   <h2 className="text-xl font-semibold">{product.name}</h2>
                   <p className="text-gray-500">Price: ${product.price}</p>
                   {/* Optionally add more product details here */}
                   <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                       Add to Cart
                   </button>
               </div>
            ))}
          </div>
        </div>
    );
}

export default Products;
