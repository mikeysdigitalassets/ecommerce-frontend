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
  
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage('Card details are missing');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/payment/create-payment-intent',
        { amount: 2000 },
        { withCredentials: true }
      );
  
      const clientSecret = response.data.client_secret;
  
      if (!clientSecret) {
        setErrorMessage('Failed to retrieve client secret.');
        return;
      }
  
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
        setErrorMessage(error.message || 'An error occurred while processing the payment.');
      } else if (paymentIntent?.status === 'succeeded') {
        // Payment successful, clear the cart
        await axios.post('/api/cart/clear', {}, { withCredentials: true });
        console.log('Payment successful!', paymentIntent);
        alert('Payment successful! Your cart has been cleared.');
      }
    } catch (error) {
      setErrorMessage('Failed to process payment.');
    } finally {
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
