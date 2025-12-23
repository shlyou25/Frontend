"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type NavbarTextProp =
  | {
    colorText: string;
    plainText: string;
    IsParaText: true;
    ParaText?: string;
    searchbarStatus?: boolean;
  }
  | {
    colorText: string;
    plainText: string;
    IsParaText: false;
  };

const NavbarComponenet = (props: NavbarTextProp) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-10">
      {/* HERO CONTAINER */}
      <div className="relative rounded-3xl bg-linear-to-br from-white via-blue-50 to-blue-100 overflow-hidden">

        {/* NAVBAR */}
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
              <li className="hover:text-blue-600 cursor-pointer">Buy</li>
              <li className="hover:text-blue-600 cursor-pointer">Sell</li>
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
              <li>Buy</li>
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
        </div>

        {/* Decorative dots */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff80_1px,transparent_0)] bg-size-[16px_16px] opacity-40" />
      </div>
    </header>
  );
};

export default NavbarComponenet;
