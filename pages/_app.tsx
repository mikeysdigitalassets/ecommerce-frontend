import '../globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Structure/Header';
import Sidebar from '../components/Structure/Sidebar';
import { UserProvider } from '../components/Context/UserContext';
import { CartProvider } from '@/components/Context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js'; // Correct import for loadStripe
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <CartProvider>
        <Elements stripe={stripePromise}> {/* Wrap the app with Elements */}
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
        </Elements>
      </CartProvider>
    </UserProvider>
  );
}

export default MyApp;
