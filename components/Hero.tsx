"use client";
import React from "react";
import Image from "next/image";
import { checkAuth } from "../utils/checkAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const router = useRouter()
  const handleAuthRedirect = async () => {
    const status = await checkAuth()
    router.push(status === "authenticated" ? "/dashboard" : "/login")
  }
  return (
    <header className="w-full px-4 sm:px-6 lg:px-10 pt-6">
      {/* Outer Background */}
      <div
        className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden
                   bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
      >
        <div
          className="absolute inset-0 pointer-events-none
                     bg-[radial-gradient(circle_at_1px_1px,#ffffff80_1px,transparent_0)]
                     bg-size-[16px_16px] opacity-30"
        />
        {/* Content */}
        <div className="relative z-10 m-4 sm:m-6 lg:m-8 rounded-[28px]">
          <div
            className="
              flex flex-col lg:flex-row
              items-center justify-between
              gap-10
              px-6 sm:px-10 lg:px-16
              py-10 sm:py-14 lg:py-20
            "
          >
            {/* LEFT: TEXT */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <span
                className="
                  inline-block bg-white rounded-full px-4 py-1
                  text-gray-600 font-medium shadow
                  mx-auto lg:mx-0
                "
              >
                TRANSPARENT BY DESIGN
              </span>
              <div className="text-lg sm:text-xl font-semibold text-gray-900">
                DOM<span className="text-blue-600">Z</span>
              </div>
              <h1
                className="
                  text-3xl sm:text-4xl lg:text-5xl
                  font-semibold leading-snug text-gray-900
                  whitespace-nowrap
                "
              >
                List. Connect. Close.

              </h1>
              <p
                className="
                  text-base sm:text-lg
                  text-gray-700 font-medium
                  max-w-lg mx-auto lg:mx-0
                "
              >
                The Decentralized Future of Domain Discovery
              </p>

              {/* CTA */}
              <div
                className="
                  flex flex-wrap gap-4
                  justify-center lg:justify-start
                "
              >
                <Link href={'/domainbuy'}
                  className="
                    bg-blue-600 text-white px-6 py-3 rounded-full
                    font-medium shadow hover:bg-blue-700 transition
                  "
                >
                  Buy
                </Link>
                <button
                  onClick={handleAuthRedirect}
                  className="
                    border border-blue-600 text-blue-600 px-6 py-3
                    rounded-full font-medium hover:bg-blue-100 transition
                  "
                >
                  Sell
                </button>
              </div>

              {/* Features */}
              <div
                className="
                  flex flex-wrap gap-6
                  justify-center lg:justify-start
                "
              >
                <div className="flex items-center gap-2">
                  <span className="bg-white rounded-full p-2 shadow">
                    <Image
                      src="/assets/icons/shake-hands.webp"
                      alt="Direct Negotiations"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="font-semibold text-gray-900">
                    Direct Negotiations
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-white rounded-full p-2 shadow">
                    <Image
                      src="/assets/icons/discount.webp"
                      alt="Zero Commission"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="font-semibold text-gray-900">
                    Zero Commission
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/assets/heroAnimation.png"
                alt="Globe and Server Illustration"
                width={600}
                height={600}
                priority
                className="
                  w-full
                  max-w-50        
                  sm:max-w-70     
                  md:max-w-90     
                  lg:max-w-130    
                  xl:max-w-150
                  h-auto
                  object-contain
                "
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
