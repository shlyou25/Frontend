"use client";
import React from "react";
import Image from "next/image";
import { checkAuth } from "../utils/checkAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import domzimg from '../public/assets/icons/domz.png'
const Hero = () => {
  const router = useRouter();

  const handleAuthRedirect = async () => {
    const status = await checkAuth();
    router.push(status === "authenticated" ? "/dashboard" : "/login");
  };

  return (
    <header className="w-full pt-16 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* LOGO */}
        <div className="flex justify-center">
          <Image
            src={domzimg}
            alt="DOMZ logo"
            width={180}
            height={60}
            priority
          />
        </div>
        {/* TAGLINE */}
        <h1 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
          List. Connect. Close.
        </h1>

        {/* CTA */}
        <div className="flex gap-4 justify-center mt-10">
          <Link
            href="/domainbuy"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-blue-700 transition w-32"
          >
            Buy
          </Link>

          <button
            onClick={handleAuthRedirect}
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition w-32"
          >
            Sell
          </button>
        </div>

      </div>
    </header>
  );
};

export default Hero;
