// types/index.ts

// Define the CartItem type
export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  
  // Define a User type as an example for user context or authentication
  export type User = {
    username: string;
    email: string;
    // Add other user-related properties as needed
  };
  
  // If you have other types specific to different parts of the application, you can define them here or in separate files within the `types` folder and import/export them as needed.
  
  // Example for a Product type
  export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
  };
  
  // Re-export types from other files (if any)
  