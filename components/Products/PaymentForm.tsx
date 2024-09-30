import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ shippingInfo }: { shippingInfo: any }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('Payment successful:', result.paymentMethod);
      // Process the payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
