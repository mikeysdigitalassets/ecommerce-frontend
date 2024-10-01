import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'; // Stripe payment form component
import ShippingForm from './ShippingForm'; // Shipping form component
import BillingForm from './BillingForm'; // Billing form component

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Checkout = ({ user, isLoggedIn }: { user: any; isLoggedIn: boolean }) => {
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [billingInfo, setBillingInfo] = useState<any>(null);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false); // Checkbox state

  const handleShippingSubmit = (info: any) => {
    setShippingInfo(info);
    console.log('Shipping Info Submitted:', info); // Debugging Log
  };

  const handleBillingSubmit = (info: any) => {
    setBillingInfo(info);
    console.log('Billing Info Submitted:', info); // Debugging Log
  };

  const handleCheckboxChange = () => {
    setUseShippingAsBilling(!useShippingAsBilling);
    if (!useShippingAsBilling && shippingInfo) {
      setBillingInfo(shippingInfo); // Copy shipping info to billing info if checked
      console.log('Using Shipping Info as Billing Info:', shippingInfo); // Debugging Log
    } else {
      setBillingInfo(null); // Clear billing info when unchecked
      console.log('Cleared Billing Info'); // Debugging Log
    }
  };

  // Debug log to ensure shippingInfo and billingInfo are populated correctly
  console.log('Checkout Shipping Info:', shippingInfo);
  console.log('Checkout Billing Info:', billingInfo);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {/* Shipping Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Enter Your Shipping Address</h2>
        <ShippingForm onSubmit={handleShippingSubmit} />
      </div>

      {/* Billing Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
        <label className="inline-flex items-center mb-4">
          <input
            type="checkbox"
            checked={useShippingAsBilling}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Use Shipping Info as Billing Info</span>
        </label>
        {!useShippingAsBilling && <BillingForm onSubmit={handleBillingSubmit} />}
      </div>

      {/* Payment Information */}
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
