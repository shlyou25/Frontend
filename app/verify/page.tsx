"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ CRITICAL
    if (otp.length !== 6) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/admin/verify-otp`,
        { otp },
        { withCredentials: true }
      );

      // ✅ Only redirect on SUCCESS
      toast.success("Admin verified successfully");
      router.push("/admin");

    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Admin Verification
        </h1>

        <form className="space-y-6" onSubmit={handleVerify}>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Enter 6-digit OTP
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={onChangeHandler}
              className="block w-full border rounded-md px-3 py-2 text-center tracking-widest"
              placeholder="••••••"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/login")}
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
      <ToastContainer />
    </div>
  );
};

export default Page;
