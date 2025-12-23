"use client";
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="w-full px-4 sm:px-6 lg:px-10 pt-6">
      {/* OUTER BACKGROUND */}
      <div
        className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden
                   bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/hero-bg.png')" // background image
        }}
      >
        {/* SUBTLE BLUE OVERLAY */}
        <div
          className="absolute inset-0 pointer-events-none
                     "
        />

        {/* INNER WHITE CARD */}
        <div className="relative z-10  rounded-[28px]
                        m-4 sm:m-6 lg:m-8">

          {/* CONTENT */}
          <div className="flex flex-col-reverse lg:flex-row
                          items-center justify-between
                          px-6 sm:px-10 lg:px-16
                          py-14 sm:py-16 lg:py-20">

            {/* LEFT CONTENT */}
            <div className="lg:w-1/2 w-full flex flex-col justify-center space-y-6">

              {/* BADGE */}
              <span className="inline-block bg-white rounded-full px-4 py-1
                               text-gray-600 font-medium shadow w-fit">
                TRANSPARENT BY DESIGN
              </span>

              {/* HEADING */}
              <h1 className="text-4xl lg:text-5xl font-semibold leading-snug text-gray-900">
                List. Connect. Close.
                <br />
                <span className="text-blue-600 font-bold">Find</span>{" "}
                <span className="font-bold">your domain</span>
              </h1>

              {/* SUBTITLE */}
              <p className="text-lg text-gray-700 font-medium max-w-lg">
                The Decentralized Future of Domain Discovery
              </p>

              {/* CTA BUTTONS */}
              <div className="flex gap-4 mt-2">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full
                                   font-medium shadow hover:bg-blue-700 transition">
                  Buy
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3
                                   rounded-full font-medium hover:bg-blue-100 transition">
                  Sell
                </button>
              </div>

              {/* FEATURES */}
              <div className="flex gap-8 mt-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-white rounded-full p-2 shadow">
                    <Image
                      src="/assets/icons/shake-hands.webp"
                      alt="Direct Negotiations"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="font-semibold text-gray-900 text-base">
                    Direct Negotiations
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-block bg-white rounded-full p-2 shadow">
                    <Image
                      src="/assets/icons/discount.webp"
                      alt="Zero Commission"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="font-semibold text-gray-900 text-base">
                    Zero Commission
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="lg:w-1/2 w-full flex justify-center items-center mb-10 lg:mb-0">
              <img
                src="/assets/heroAnimation.png"
                alt="Globe and Server Illustration"
                className="max-w-xl w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* DOTTED TEXTURE (VERY SUBTLE) */}
        <div
          className="absolute inset-0 pointer-events-none
                     bg-[radial-gradient(circle_at_1px_1px,#ffffff80_1px,transparent_0)]
                     bg-size-[16px_16px] opacity-30"
        />
      </div>
    </header>
  );
};

export default Hero;
