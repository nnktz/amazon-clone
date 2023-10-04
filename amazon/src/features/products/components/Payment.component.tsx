import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { resetCart } from '../productSlice';

const PaymentComponent = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.product);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (totalQty === 0) {
      return;
    }

    if (paymentStatus !== 'succeeded') {
      return;
    }

    dispatch(resetCart());
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (totalQty === 0) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const cardEle = elements.getElement(CardElement);

    setIsProcessing(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_API}/stripe`, {
        cart,
      });

      const { client_secret: clientSecret } = res.data;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardEle!,
        },
      });

      if (!paymentIntent) {
        setPaymentStatus('Payment failed!');
      } else {
        setPaymentStatus(paymentIntent.status);
      }
    } catch (error) {
      console.log('error', error);
      setPaymentStatus('Payment failed!');
    }

    setIsProcessing(false);
  };

  return (
    <div style={{ fontSize: 20 }}>
      <form
        onSubmit={handleSubmit}
        action=''
        id='payment-form'>
        <label htmlFor='card-element'>Place order</label>
        <CardElement id='card-element' />
        {!isProcessing && (
          <button
            style={{
              marginTop: 16,
              paddingTop: 8,
              paddingBottom: 8,
              height: 50,
              width: '100%',
              backgroundColor: '#f0c14b',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 20,
              cursor: 'pointer',
            }}>
            Pay
          </button>
        )}
        {isProcessing && <div>Processing...</div>}
        {!isProcessing && paymentStatus && <div>Status: {paymentStatus}</div>}
      </form>
    </div>
  );
};

const PaymentGateway = () => {
  const stripePromise = loadStripe(
    'pk_test_51NxRf2CAgWdSScvLvEdTAeTz75qKPfXBI0bJvC8swzBvn5L3XYqdSkRyJwOPbjkSgp18f9KfuaWzS91vxGU22yTk00grUH4b5M'
  );

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
};

export default PaymentGateway;
