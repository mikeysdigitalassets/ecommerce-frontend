// import React from "react";

// const Orders = () => {

    // dont really need this anymore, went a different direction, may use for a different component
//     return (
//         <div>
//             lorem ipsum
//         </div>
//     )


// }

// export default Orders;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const ProductListResult = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
  
//   const router = useRouter();
//   const { query } = router.query;  // Get the search term from the URL

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         let response;
        
//         // Check if there's a search query
//         if (query) {
//           response = await axios.get(`http://localhost:5000/api/product/search`, {
//             params: { search: query },  // Send search term to the back end
//           });
//         } else {
//           // If no search query, fetch all products
//           response = await axios.get(`http://localhost:5000/api/products`);
//         }
        
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError("Failed to load products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [query]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
//       {query ? (
//         <h1 className="text-4xl font-bold text-center mb-8">
//           Search Results for "{query}"
//         </h1>
//       ) : (
//         <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white shadow-md rounded-md overflow-hidden transition hover:scale-105 hover:shadow-lg"
//               style={{ maxWidth: "240px", margin: "0 auto" }}
//             >
//               <img
//                 src={`https://picsum.photos/300/150?random=${Math.floor(Math.random() * 1000)}`}
//                 alt={product.name}
//                 className="w-full h-32 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold">{product.name}</h2>
//                 <p className="text-gray-500 mt-1">Price: ${product.price.toFixed(2)}</p>
//                 <button className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products found for "{query}".</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductListResult;
//useEffect(() => {
    //     const fetchProducts = async () => {
    //       if (query) {
    //         try {
    //           const response = await axios.get(`http://localhost:5000/api/products/search`, {
    //             params: { search: query },
    //             withCredentials: true // Pass the search query to the backend
    //           });
    //           setProducts(response.data);
    //           console.log("these are the products",products);
    //         } catch (err) {
    //           setError('Error fetching search results.');
    //         } finally {
    //           setLoading(false);
    //         }
    //       }
    //     };