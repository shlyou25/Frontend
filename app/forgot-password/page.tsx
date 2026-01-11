"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgotPassword=()=> {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [loading, setLoading] = useState(false);


  const sendOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res =await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/forgot-password`,
        { email },
        { withCredentials: true }
      );
      toast.success(res.data.message||"If the email exists, a reset code has been sent");
      setStep("OTP");
    } catch {
      toast.error("Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/verify-forgot-otp`,
        { otp },
        { withCredentials: true }
      );
      router.push("/reset-password");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/resend-forgot-otp`,
        {},
        { withCredentials: true }
      );

      toast.success("OTP resent");
    } catch {
      toast.error("Please wait before requesting again");
    }
  };

  return (
    <main className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border-2 border-indigo-300 p-7">

        <h1 className="text-2xl font-bold text-center mb-2">
          Forgot password?
        </h1>

        {step === "EMAIL" && (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-md"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-md"
            >
              {loading ? "Sending..." : "Send reset code"}
            </button>
          </form>
        )}

        {step === "OTP" && (
          <form onSubmit={verifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              className="w-full px-4 py-3 border rounded-md text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />

            <button
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-md"
            >
              {loading ? "Verifying..." : "Verify code"}
            </button>

            <button
              type="button"
              onClick={resendOtp}
              className="text-blue-600 text-sm underline w-full"
            >
              Resend code
            </button>
          </form>
        )}

      </div>
    </main>
  );
}

export default ForgotPassword;