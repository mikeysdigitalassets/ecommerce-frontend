import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios'; // For making API calls to your backend

const PaymentForm = ({ shippingInfo, billingInfo }: { shippingInfo: any; billingInfo: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    setIsProcessing(true);

    // get CardElement from Stripe.js
    const cardElement = elements.getElement(CardElement);

    try {
      // Call your backend to create a PaymentIntent
      const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: 2000, // Replace with the actual amount in cents
      },
      {
        withCredentials: true,
      });
    
      const clientSecret = data.clientSecret;  // Extract clientSecret from the response
    
      console.log('Client Secret:', clientSecret);
    
      // Confirm the card payment using the client secret from the backend
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: billingInfo.name,
            email: billingInfo.email,
            address: {
              line1: billingInfo.address,
              city: billingInfo.city,
              state: billingInfo.state,
              postal_code: billingInfo.zip,
            },
          },
        },
      });
    
      if (error) {
        console.error('Stripe Error:', error.message);
        setErrorMessage(error.message || 'An error occurred while processing the payment.');
      } else if (paymentIntent?.status === 'succeeded') {
        // Payment was successful
        console.log('Payment successful!', paymentIntent);
        alert('Payment successful!');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setErrorMessage('Failed to process payment.');
    }
    
     finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col col-span-2">
        <label className="mb-1 font-semibold text-gray-700">Card Details</label>
        <div className="p-2 border border-gray-300 rounded">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>

      <button type="submit" className="col-span-2 mt-4 bg-blue-600 text-white p-2 rounded" disabled={isProcessing || !stripe}>
        {isProcessing ? 'Processing...' : 'Complete Purchase'}
      </button>

      {errorMessage && <div className="col-span-2 text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

export default PaymentForm;
