import React, { useState,useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'; // A separate component for the Stripe payment form
import ShippingForm from './ShippingForm'; // A form component to collect shipping details
import { useRouter } from "next/router";

const stripePromise = loadStripe('your_test_stripe_public_key'); // Replace with your Stripe public key

const Checkout = ({ user, isLoggedIn }: { user: any; isLoggedIn: boolean }) => {
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [shippingInfo, setShippingInfo] = useState(null);
  const router = useRouter();

  // useEffect(() =>{
  //   if (isLoggedIn == false) {
      
  //     router.push("/register");
  //     setUserCheck
  //   }
    
  // })

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push("/checkout"); // Redirect to checkout if user is logged in
    } else {
      // Redirect to the login page with the useCheck query parameter set to true
      router.push("/login?useCheck=true");
    }
  };
  

  const handleShippingSubmit = (info: any) => {
    setShippingInfo(info);
    setStep('payment');
  };

  return (
    <div>
      {step === 'shipping' && (
        <ShippingForm onSubmit={handleShippingSubmit} />
      )}
      {step === 'payment' && (
        <Elements stripe={stripePromise}>
          <PaymentForm shippingInfo={shippingInfo} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
