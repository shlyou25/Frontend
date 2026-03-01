"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { handleAuthRedirect } from "../utils/checkAuth";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export type NavbarTextProp = {
  text: string;
  IsParaText: boolean;
  ParaText?: React.ReactNode;
  searchbarStatus?: boolean;
  onSearch?: (value: string) => void;
  searchValue?: string;
  email?: string; // ✅ new optional prop
};

const NavbarComponenet = (props: NavbarTextProp) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-10" id="navbar">
      <div className="relative rounded-3xl bg-linear-to-br from-white via-blue-50 to-blue-100 overflow-hidden pt-4 pb-6">
        <nav className="relative z-20 max-w-7xl mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.jpg"
              alt="Domz Logo"
              width={110}
              height={38}
              priority
            />
          </Link>
          <div className="hidden md:flex">
            <ul className="flex items-center gap-8 bg-white/80 backdrop-blur px-8 py-2.5 rounded-full shadow-sm border border-white/40">
              <li className="relative group cursor-pointer">
                <span className="flex items-center gap-1 hover:text-blue-600 transition"
                  onClick={() => router.push("/")}
                >
                  Home
                  <ChevronDown
                    size={16}
                    className="text-gray-500 group-hover:text-blue-600 transition-transform duration-200 group-hover:rotate-180"
                  />
                </span>
                <div
                  className="absolute left-0 top-full mt-3 w-44 rounded-xl bg-white shadow-lg border border-gray-200
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200"
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <Link
                      href="/#faq"
                      className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition"
                    >
                      FAQ
                    </Link>

                    <Link
                      href="/#about"
                      className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition"
                    >
                      About
                    </Link>
                  </ul>
                </div>
              </li>
              <Link href="/domainbuy" className="hover:text-blue-600 cursor-pointer">
                Buy
              </Link>

              <li
                onClick={() => handleAuthRedirect(router)}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                Sell
              </li>
              <Link href="/contact" className="hover:text-blue-600 cursor-pointer">
                Contact
              </Link>
            </ul>
          </div>
          <div className="hidden md:block">
            <button onClick={() => handleAuthRedirect(router)} className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition">
              My Domz
            </button>
          </div>
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
        {menuOpen && (
          <div className="md:hidden bg-white rounded-xl mx-4 mt-2 shadow-lg p-4">
            <ul className="space-y-4 text-gray-800">
              <Link href="/">Home</Link>
              <Link href="/domainbuy">Buy</Link>
              <li onClick={() => handleAuthRedirect(router)}>Sell</li>
              <Link href="/contact">Contact</Link>
              <Link href="/portfolio">
                <button className="w-full mt-3 bg-linear-to-r from-blue-500 to-blue-600 text-white py-2 rounded-full">
                  My Domz
                </button>
              </Link>
            </ul>
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-center pt-14 pb-1.5 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-blue-600 via-blue-500 to-slate-900 bg-clip-text text-transparent">
              {props.text}
            </span>
          </h1>
          {props.IsParaText && (
            <p className="mt-4 max-w-xl text-gray-700">
              {props.email ? (
                <>
                  As a user-centric platform, your feedback matters.
                  <br />
                  Reach out via the contact form or email,{" "}
                  <a
                    href={`mailto:${props.email}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {props.email}
                  </a>
                </>
              ) : (
                props.ParaText
              )}
            </p>
          )}
          {props.searchbarStatus && (
            <div className="mt-6 w-full max-w-xl">
              <div className="bg-white/90 backdrop-blur rounded-full shadow-sm border border-gray-200 flex items-center px-5 py-3 relative">
                <input
                  type="text"
                  value={props.searchValue || ''}
                  placeholder="Search"
                  onChange={(e) => props.onSearch?.(e.target.value)}
                  className="w-full text-gray-700 placeholder-gray-400 focus:outline-none pr-10 bg-transparent"
                />
                {props.searchValue && (
                  <button
                    type="button"
                    onClick={() => {
                      props.onSearch?.("");
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ffffff80_1px,transparent_0)] bg-size-[16px_16px] opacity-40" />
      </div>
    </header>
  );
};

export default NavbarComponenet;
