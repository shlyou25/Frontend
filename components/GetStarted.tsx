"use client";

import React from "react";
import { CheckCircle, XCircle, UserCircle } from "lucide-react";

const GetStarted = () => {
  return (
    <section className="flex justify-center py-20 px-4 ">
      <div className="w-full max-w-6xl text-center rounded-3xl p-12 shadow-lg bg-[url(/assets/getstarted.webp)] bg-cover">
      
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Ready to list?
        </h2>
        <p className="text-blue-100 text-base md:text-lg mb-8">
          Choose the plan that fits you best — flexible, seller-first pricing.
        </p>
        <button className="bg-white text-blue-600 font-medium px-8 py-3 rounded-full shadow-md hover:bg-blue-50 transition cursor-pointer">
          Get Started
        </button>
        <div className="flex justify-center items-center gap-8 mt-10 flex-wrap text-white">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Free Trial</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCircle className="w-5 h-5" />
            <span>Brokers Account</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetStarted