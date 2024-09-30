import React from 'react';

const PaymentForm = ({ shippingInfo, billingInfo }: { shippingInfo: any; billingInfo: any }) => {
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Shipping Info:', shippingInfo);
    console.log('Billing Info:', billingInfo);
    // Payment submission logic goes here
  };

  return (
    <form onSubmit={handlePayment} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex flex-col col-span-2">
        <label className="mb-1 font-semibold text-gray-700">Card Number</label>
        <input
          name="cardNumber"
          placeholder="Credit Card Number"
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">Expiration Date (MM/YY)</label>
        <input
          name="expirationDate"
          placeholder="MM/YY"
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-gray-700">CVV</label>
        <input
          name="cvv"
          placeholder="CVV"
          required
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      <button type="submit" className="col-span-2 mt-4 bg-blue-600 text-white p-2 rounded">
        Complete Purchase
      </button>
    </form>
  );
};

export default PaymentForm;
