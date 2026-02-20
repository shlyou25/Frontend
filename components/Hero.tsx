"use client";
import React from "react";
import Image from "next/image";
import { checkAuth } from "../utils/checkAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const router = useRouter();

  const handleAuthRedirect = async () => {
    const status = await checkAuth();
    router.push(status === "authenticated" ? "/dashboard" : "/login");
  };

  return (
    <header className="w-full px-[2%] py-10">
        <div
          className="
            max-w-6xl mx-auto
            flex flex-col items-center
            text-center
            px-6 sm:px-10
            py-14 sm:py-20
            gap-8
          "
        >
          <span
            className="
              inline-block bg-white rounded-full px-5 py-1.5
              text-gray-600 font-medium shadow uppercase
            "
          >
            THE FUTURE OF DOMAIN DISCOVERY
          </span>
          <div
            className="
              font-extrabold text-gray-900
              text-3xl sm:text-2xl lg:text-4xl
            "
          >
            DOM<span className="text-blue-600">Z</span>
          </div>
          <h1
            className="
              text-3xl sm:text-4xl lg:text-5xl
              font-semibold text-gray-900
            "
          >
            List. Connect. Close.
          </h1>
          {/* <p
            className="
              text-base sm:text-lg
              text-slate-600 font-medium
              max-w-2xl
            "
          >
            The Decentralized Future of Domain Discovery
          </p> */}

          {/* CTA */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/domainbuy"
              className="
                bg-blue-600 text-white px-8 py-3 rounded-full
                font-medium shadow hover:bg-blue-700 transition w-28
              "
            >
              Buy
            </Link>

            <button
              onClick={handleAuthRedirect}
              className="
                border border-blue-600 text-blue-600 px-8 py-3
                rounded-full font-medium hover:bg-blue-100 transition w-28
              "
            >
              Sell
            </button>
          </div>
        </div>
    </header>
  );
};

export default Hero;
