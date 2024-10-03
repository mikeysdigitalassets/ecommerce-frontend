import React, { useContext, useEffect, useState } from 'react';
import Checkout from '@/components/Products/CheckOut';
import { UserContext } from '../components/Context/UserContext';
import { useRouter } from 'next/router';


const CheckoutPage = () => {
  const userContext = useContext(UserContext); // Get the UserContext
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  // trouble shooting user context
  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user } = userContext;

  // allows guest checkout if no user
  useEffect(() => {
    if (!user) {
      const isCheckoutAsGuest = router.query.checkout === 'true'; // if comming from checkout page
      if (!isCheckoutAsGuest) {
        router.push('/login?checkout=true');
      } else {
        setIsGuest(true); // allows guest checkout
      }
    }
  }, [user, router]);

  return (
    <div>
      {user ? (
        <Checkout user={user} isLoggedIn={true} />
      ) : isGuest ? (
        <Checkout user={null} isLoggedIn={false} /> // allows guest checkout
      ) : (
        <p>Redirecting to login...</p> 
      )}
    </div>
  );
};

export default CheckoutPage;
