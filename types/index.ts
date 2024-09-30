


export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  
  
  export type User = {
    username: string;
    email: string;
    password?: string; // Optional if you don't want to store the password in client state
  }
  
 
  
  
  export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
  };
  

  