// pages/_app.tsx
import '../globals.css'; // Import global styles
import type { AppProps } from 'next/app'; // Import AppProps for types
import Header from '../components/Structure/Header';
import Sidebar from '../components/Structure/Sidebar';
import { UserProvider } from '../components/Context/UserContext'; // Import UserProvider from your context
import { CartProvider } from '@/components/Context/CartContext';

// Define a type for CartItems (if needed)
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <CartProvider>
      <div className="flex h-[100vh] w-[100vw]">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          {/* Header will use the context for user info, no need to pass as props */}
          <Header />
          <div className="flex-grow bg-gray-100 overflow-y-auto">
            <Component {...pageProps} /> {/* Pass pageProps to the component */}
          </div>
        </div>
      </div>
      </CartProvider>
    </UserProvider>
  );
}

export default MyApp;
