"use client";

import NavbarComponenet from "@/components/NavbarComponenet";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* HERO + NAVBAR */}
      <NavbarComponenet
        colorText="S"
        plainText="ign In"
        IsParaText={false}
      />

      {/* FORM SECTION */}
      <main className="flex-1 flex justify-center px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-3xl mt-10 lg:mt-16">

          <form className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded-xl bg-blue-50 px-5 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full rounded-xl bg-blue-50 px-5 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded" />
              <p>
                I agree to the{" "}
                <span className="text-blue-600 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-600 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full sm:w-56 rounded-full py-3
                         bg-linear-to-r from-blue-500 to-blue-600
                         text-white font-semibold shadow-md
                         hover:from-blue-600 hover:to-blue-700 transition"
            >
              LOGIN
            </button>

            {/* Links */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">
              <p>
                Don’t have an account?{" "}
                <span className="text-blue-600 font-semibold cursor-pointer">
                  Sign Up
                </span>
              </p>
              <span className="text-blue-600 cursor-pointer">
                Forgot password?
              </span>
            </div>

          </form>
        </div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}
