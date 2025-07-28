// src/pages/PaymentSuccess.jsx

import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");
  const transactionId = searchParams.get("transaction_id");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-[#fff2e6] to-[#ffd9b3] flex flex-col justify-center items-center p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-xl max-w-xl w-full p-10 text-center">
        <div className="text-green-600 text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-[#5a2c08] mb-2">
          Payment Successful!
        </h1>
        <p className="text-[#7a4c1f] mb-6">
          Thank you for your payment. Your order has been confirmed.
        </p>
        <div className="bg-[#fff7f0] p-6 rounded-xl shadow-inner text-left">
          <p className="text-sm text-[#5a2c08] mb-2">
            <span className="font-semibold">Transaction ID:</span>{" "}
            <span className="text-orange-600">{transactionId || "N/A"}</span>
          </p>
          <p className="text-sm text-[#5a2c08]">
            <span className="font-semibold">PIDX:</span>{" "}
            <span className="text-orange-600">{pidx || "N/A"}</span>
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#cf5c14] text-white rounded-lg font-medium hover:bg-[#b74f10] transition"
          >
            Continue Shopping 📚
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
