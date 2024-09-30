import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'; // Stripe payment form component
import ShippingForm from './ShippingForm'; // Shipping form component
import BillingForm from './BillingForm'; // Billing form component

const stripePromise = loadStripe('your_test_stripe_public_key'); // Replace with your Stripe public key

const Checkout = ({ user, isLoggedIn }: { user: any; isLoggedIn: boolean }) => {
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [billingInfo, setBillingInfo] = useState<any>(null);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(false); // Checkbox state

  const handleShippingSubmit = (info: any) => {
    setShippingInfo(info);
  };

  const handleBillingSubmit = (info: any) => {
    setBillingInfo(info);
  };

  const handleCheckboxChange = () => {
    setUseShippingAsBilling(!useShippingAsBilling);
    if (!useShippingAsBilling) {
      setBillingInfo(shippingInfo); // Copy shipping info to billing info if checked
    } else {
      setBillingInfo(null); // Clear billing info when unchecked
    }
  };

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
