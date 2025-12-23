"use client";

import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const searchParams = useSearchParams();

  const planTitle = searchParams.get("plan");

  const handlePay = async () => {
    if (!stripe || !elements || !planTitle) return;

    try {
      const intentRes = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}payment/create-intent`,
        { planTitle },
        {
          withCredentials: true,
          validateStatus: (status) => status < 500 
        }
      );
      // 🚫 Active plan exists
      if (intentRes.data.code === "ACTIVE_PLAN_EXISTS") {
        toast.error(intentRes.data.message);
        setTimeout(() => {
          router.push("/plan");
        }, 3000);

      }
      // ✅ Continue payment only if allowed
      const result = await stripe.confirmCardPayment(
        intentRes.data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!
          }
        }
      );
      if (result.error) {
        toast.error(result.error.message);
        return;
      }
      if (result.paymentIntent?.status === "succeeded") {
        await axios.post(
          `${process.env.NEXT_PUBLIC_apiLink}payment/confirm`,
          { paymentIntentId: result.paymentIntent.id },
          { withCredentials: true }
        );
        toast.success("Payment successful & plan activated!");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Payment failed");
    }
  };
return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Pay for <span className="text-blue-600">{planTitle}</span>
      </h2>

      <CardElement className="p-3 border rounded" />

      <button
        onClick={handlePay}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default function PaymentPage() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <ToastContainer />
    </>
  );
}
