import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios'; 
import { useUser } from "../Context/UserContext";
import { useRouter } from "next/router"; 
import { stackTraceLimit } from 'postcss/lib/css-syntax-error';

const PaymentForm = ({ shippingInfo, billingInfo }: { shippingInfo: any; billingInfo: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      return; // stripe hasnt loaded yet
    }
  
    setIsProcessing(true);
  
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setErrorMessage('Card details are missing');
      return;
    }
  
    try {
      
      const response = await axios.post(
        // 'http://localhost:5000/api/payment/create-payment-intent'
        'http://localhost:8080/api/payment/create-payment-intent' ,
        { amount: 2000, 
          currency: "usd"
        },
        
        { withCredentials: true }
      );
  
      const clientSecret = response.data.client_secret;
  
      if (!clientSecret) {
        setErrorMessage('Failed to retrieve client secret.');
        return;
      }
      const currentDate = new Date().toISOString().split('T')[0]; // This will give YYYY-MM-DD format
      
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
      } else if (user && paymentIntent?.status === 'succeeded') {
        // on sucessfull payment transaction clear the cart
        console.log(clientSecret);
        // console.log(cardElement);
        const amount = paymentIntent.amount;
        await axios.post("http://localhost:8080/api/payment/transaction", {
          user_id: user.id,
          shipping_address: shippingInfo.address,
          city: shippingInfo.city,
          first_name: shippingInfo.firstName,
          last_name: shippingInfo.lastName,
          state: shippingInfo.state,
          postal_code: shippingInfo.zipCode,
          order_date: currentDate,
          total_amount: amount
        }, {
          withCredentials: true
        });
        

        await axios.post('http://localhost:5000/api/cart/clear', null , { 
          params: {userId: user.id},
          withCredentials: true, 
        });
        console.log('Payment successful!', paymentIntent);
        alert('Payment successful!');
        router.push("/");
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
