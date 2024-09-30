import React, { useContext, useEffect, useState } from 'react';
import Checkout from '@/components/Products/CheckOut';
import { UserContext } from '../components/Context/UserContext';
import { useRouter } from 'next/router';

// Ensure that your `CheckoutPage` component is correctly typed
const CheckoutPage = () => {
  const userContext = useContext(UserContext); // Get the UserContext
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  // If userContext is undefined, that means the context is not available
  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user } = userContext;

  // If no user is logged in, allow guest checkout or redirect to login
  useEffect(() => {
    if (!user) {
      const isCheckoutAsGuest = router.query.checkout === 'true'; // If coming from checkout page
      if (!isCheckoutAsGuest) {
        router.push('/login?checkout=true');
      } else {
        setIsGuest(true); // Allow guest checkout
      }
    }
  }, [user, router]);

  return (
    <div>
      {user ? (
        <Checkout user={user} isLoggedIn={true} />
      ) : isGuest ? (
        <Checkout user={null} isLoggedIn={false} /> // Allow guest checkout
      ) : (
        <p>Redirecting to login...</p> // Optional message before redirect
      )}
    </div>
  );
};

export default CheckoutPage;
