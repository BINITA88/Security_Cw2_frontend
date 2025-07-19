import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";

// Stripe publishable key
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

// Inner form component
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/stripe/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: 1000, // Amount in paisa (e.g., 1000 = NPR 10)
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Payment Successful!");
      } else {
        toast.error(data.message || "Payment failed.");
      }

    } catch (err) {
      toast.error("Payment processing error.");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border p-4 rounded-md">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#cf5c14] text-white py-3 px-4 rounded-md hover:bg-[#b74f10] font-semibold"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// Main Payment Page
const Payment = () => {
  return (
    <div className="min-h-screen bg-[#fff8f2] flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#5b3822]">Complete Your Payment</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
