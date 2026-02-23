"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verify_email_user_domz");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const endpoint = email
        ? "auth/verify-email"
        : "auth/admin/verify-otp";

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}${endpoint}`,
        { otp: otp.trim() },           // ✅ only OTP
        { withCredentials: true }      // ✅ REQUIRED
      );

      toast.success(res.data.message || "Verification successful");

      // 🧹 Cleanup & redirect
      if (email) {
        sessionStorage.removeItem("verify_email_user_domz");
        router.replace("/login");
      } else {
        router.replace("/admin");
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;

    setResending(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/resend-email-otp`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data.message || "OTP resent to your email");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to resend OTP"
      );
    } finally {
      setResending(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4 text-center">
          {email ? "Email Verification" : "Admin Verification"}
        </h1>

        <form className="space-y-6" onSubmit={handleVerify}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="block w-full border rounded-md px-3 py-2 text-center tracking-widest"
            placeholder="••••••"
            required
          />

          {/* 🔁 Resend OTP (USER ONLY) */}
          {email && (
            <div className="text-right">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="text-sm text-blue-600 hover:underline disabled:opacity-50"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-200 rounded-md"
              disabled={loading}
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
