"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { checkAuth } from "@/utils/checkAuth";
import { useRouter } from "next/navigation"

export type NavbarTextProp =
  | {
    colorText: string;
    plainText: string;
    IsParaText: true;
    ParaText?: string;
    searchbarStatus?: boolean;
    onSearch?: (value: string) => void; // ✅ ADD
  }
  | {
    colorText: string;
    plainText: string;
    IsParaText: false;
    searchbarStatus?: boolean;
    onSearch?: (value: string) => void; // ✅ ADD
  };


const NavbarComponenet = (props: NavbarTextProp) => {
  const router = useRouter()
  const handleAuthRedirect = async () => {
    const status = await checkAuth()
    router.push(status === "authenticated" ? "/dashboard" : "/login")
  }
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full px-4 sm:px-6 lg:px-10">
      <div className="relative rounded-3xl bg-linear-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
        <nav className="relative z-20 max-w-7xl mx-auto flex items-center justify-between px-6 ">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.jpg"
              alt="Domz Logo"
              width={110}
              height={38}
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <ul className="flex items-center gap-8 bg-white px-8 py-3 rounded-full shadow-sm text-gray-900 text-[15px]">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href={'/domainbuy'} className="hover:text-blue-600 cursor-pointer">Buy</Link>
              <li
                onClick={handleAuthRedirect}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                Sell
              </li>
              <Link href={'/contact'} className="hover:text-blue-600 cursor-pointer">Contact</Link>
            </ul>
          </div>

          {/* My Domz Button */}
          <Link href="/portfolio" className="hidden md:block">
            <button className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition">
              My Domz
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white rounded-xl mx-4 mt-2 shadow-lg p-4">
            <ul className="space-y-4 text-gray-800">
              <Link href={'/'}>Home</Link>
              <Link href={'/domainbuy'}>Buy</Link>
              <li>Sell</li>
              <Link href={'/contact'}>Contact</Link>
              <Link href="/portfolio">
                <button className="w-full mt-3 bg-linear-to-r from-blue-500 to-blue-600 text-white py-2 rounded-full">
                  My Domz
                </button>
              </Link>
            </ul>
          </div>
        )}

        {/* HEADING */}
        <div className="flex flex-col items-center justify-center text-center py-20 relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold flex gap-1">
            {/* Colored first letter */}
            <span className="text-blue-600">{props.colorText}</span>
            <span className="bg-linear-to-r from-blue-500 via-gray-800 to-black
                   bg-clip-text text-transparent">
              {props.plainText}
            </span>
          </h1>
          {props.IsParaText && (
            <p className="mt-4 max-w-xl text-gray-700">
              {props.ParaText}
            </p>
          )}
          {/* SEARCH BAR */}
          {props.searchbarStatus && (
            <div className="mt-8 w-full flex justify-center px-4">
              <div
                className="
        w-full max-w-2xl
        bg-white
        rounded-full
        shadow-md
        flex items-center
        px-4 py-3
      "
              >
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => props.onSearch?.(e.target.value)}
                  className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
                />


                <button
                  className="
          ml-3
          flex items-center justify-center
          w-10 h-10
          rounded-full
          bg-white
          hover:bg-gray-100
          transition
        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Decorative dots */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff80_1px,transparent_0)] bg-size-[16px_16px] opacity-40" />
      </div>
    </header>
  );
};

export default NavbarComponenet;
