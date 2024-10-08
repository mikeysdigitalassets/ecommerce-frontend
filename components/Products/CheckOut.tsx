import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'; 
import ShippingForm from './ShippingForm'; 
import BillingForm from './BillingForm'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Checkout = ({ user, isLoggedIn }: { user: any; isLoggedIn: boolean }) => {
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [billingInfo, setBillingInfo] = useState<any>(null);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false); 
  const [hideBillingBox, setHideBillingBox] = useState(true);

  const handleShippingSubmit = (info: any) => {
    setShippingInfo(info);
    console.log('Shipping Info Submitted:', info); // keeping these logging just incase, setting up the shipping/billing functionality was a pain
    setHideBillingBox(false);
  };

  const handleBillingSubmit = (info: any) => {
    setBillingInfo(info);
    console.log('Billing Info Submitted:', info); 
  };

  const handleCheckboxChange = () => {
    setUseShippingAsBilling(!useShippingAsBilling);
    if (!useShippingAsBilling && shippingInfo) {
      setBillingInfo(shippingInfo); // copies shipping info into billing info if checked
      console.log('Using Shipping Info as Billing Info:', shippingInfo); // more logging ill keep for shipping/billing info incase issues in the future
    } else {
      setBillingInfo(null); // this clears the billing form when checked
      // console.log('Cleared Billing Info');  logging i no longer need but will have // just incase
    }
  };

  // log to show billing/shipping filled out correctly, will keep just in case
  console.log('Checkout Shipping Info:', shippingInfo);
  console.log('Checkout Billing Info:', billingInfo);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {/* this is for shipping info */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Enter Your Shipping Address</h2>
        <ShippingForm onSubmit={handleShippingSubmit} />
      </div>

      {/* this is for billing info */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
        {hideBillingBox == false ? 
          <>
          <label className="inline-flex items-center mb-4">
          <input
            type="checkbox"
            checked={useShippingAsBilling}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Use Shipping Info as Billing Info</span>
        </label>
          </>  :
          null }
        
        {!useShippingAsBilling && <BillingForm onSubmit={handleBillingSubmit} />}
      </div>

      {/* payment info */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm
            shippingInfo={shippingInfo}
            billingInfo={useShippingAsBilling ? shippingInfo : billingInfo}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
