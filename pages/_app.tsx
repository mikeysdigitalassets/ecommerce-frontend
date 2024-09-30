import '../globals.css'; 
import type { AppProps } from 'next/app'; 
import Header from '../components/Structure/Header';
import Sidebar from '../components/Structure/Sidebar';
import { UserProvider } from '../components/Context/UserContext'; 
import { CartProvider } from '@/components/Context/CartContext';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider> 
      <CartProvider>
      <div className="flex h-[100vh] w-[100vw]">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          
          <Header />
          <div className="flex-grow bg-gray-100 overflow-y-auto">
            <Component {...pageProps} /> 
          </div>
        </div>
      </div>
       <ToastContainer />
      </CartProvider>
    </UserProvider>
  );
}

export default MyApp;
