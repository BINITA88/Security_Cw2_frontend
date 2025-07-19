// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// import { ToastContainer, toast } from 'react-toastify';
// import Payment from './Payment';

// const PaymentElement = () => {
//   const [stripeApiKey, setStripeApiKey] = useState('');
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [error, setError] = useState(null); // Add error state

//   useEffect(() => {
//     async function getStripeApiKey() {
//       try {
//         const { data } = await axios.get('/api/stripeapi');
//         setStripeApiKey(data.stripeApiKey);
//       } catch (err) {
//         setError('Failed to load Stripe API key');
//         toast.error('Failed to load Stripe API key');
//         console.error('Error fetching Stripe API key:', err);
//       } finally {
//         setLoading(false); // Stop loading when the request is complete
//       }
//     }
//     getStripeApiKey();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading indicator while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if there's an issue
//   }

//   return (
//     <>
//       <ToastContainer theme="colored" position="top-center" />
//       {stripeApiKey && (
//         <Elements stripe={loadStripe(stripeApiKey)}>
//           < Payment/>
//         </Elements>
//       )}
//     </>
//   );
// };

// export default PaymentElement;
