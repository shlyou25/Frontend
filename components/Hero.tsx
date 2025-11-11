"use client";
import React from "react";

const Hero = () => (
  <header className="min-w-full  from-gray-100 via-white to-blue-50 pb-12">
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-6xl mx-auto px-4 pt-16">
      {/* Left Side Content */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center space-y-6">
        <span className="inline-block bg-white rounded-full px-4 py-1 text-gray-600 font-medium shadow mb-2 w-fit">
          TRANSPARENT BY DESIGN
        </span>
        <h1 className="text-4xl lg:text-5xl font-semibold leading-snug text-gray-900">
          List. Connect. Close.
          <br />
          <span className="text-blue-600 font-bold">Find</span> your domain
        </h1>
        <p className="mt-4 text-lg text-gray-700 font-medium">
          The Decentralized Future of Domain Discovery
        </p>
        <div className="flex gap-4 mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-blue-700 transition">Buy</button>
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-100 transition">Sell</button>
        </div>
        <div className="flex gap-8 mt-8">
          <div className="flex items-center gap-2">
            <span className="inline-block bg-blue-100 rounded-full p-2">
              {/* You can replace this with an actual icon */}
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6V12L16 14"/><circle cx="12" cy="12" r="10"/></svg>
            </span>
            <span className="font-semibold text-gray-900 text-base">Direct Negotiations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block bg-blue-100 rounded-full p-2">
              {/* You can replace this with an actual icon */}
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4l3-3"/></svg>
            </span>
            <span className="font-semibold text-gray-900 text-base">Zero Commission</span>
          </div>
        </div>
      </div>

      {/* Right Side Illustration */}
      <div className="lg:w-1/2 w-full flex justify-center items-center mb-10 lg:mb-0">
        <img
          src="/assets/heroAnimation.png"
          alt="Globe and Server Illustration"
          className="max-w-xl w-full h-auto"
        />
      </div>
    </div>
  </header>
);

export default Hero;
