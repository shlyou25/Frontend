"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const  ResetPassword=()=> {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/reset-password`,
        { newPassword: password },
        { withCredentials: true }
      );

      toast.success("Password reset successful");
      router.replace("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">

      {/* LEFT SIDE – FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border">

          <h1 className="text-2xl font-bold mb-2">Create new password</h1>
          <p className="text-gray-600 mb-6">
            Your new password must be different from previous passwords.
          </p>

          <form onSubmit={handleReset} className="space-y-5">

            <div>
              <label className="block mb-1 text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE – IMAGE */}
      <div className="hidden lg:flex items-center justify-center ">
        <img
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
          alt="Reset password"
          className="max-w-md"
        />
      </div>
    </div>
  );
}

export default ResetPassword;