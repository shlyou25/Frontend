"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { handleAuthRedirect } from "../utils/checkAuth"
import { ChevronDown } from "lucide-react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="w-full flex justify-between items-center px-6 lg:px-20 py-6 relative z-50 max-w-7xl mx-auto " id="navbar">
      <Link href="/">
        <div className="relative h-8 w-27.5 shrink-0">
          <Image
            src="/assets/logo.jpg"
            alt="Domz Logo"
            fill
            priority
            sizes="110px"
            className="object-contain"
          />
        </div>
      </Link>
      <div className="hidden md:flex bg-white/60 backdrop-blur-xl px-6 py-2 rounded-full border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <ul className="flex items-center space-x-8 text-gray-800 font-medium">
          <li className="relative group">
            <span
              onClick={() => router.push("/")}
              className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
            >
              Home
              <ChevronDown
                size={16}
                className="text-gray-500 group-hover:text-blue-600 transition-transform duration-200 group-hover:rotate-180"
              />
            </span>

            <div className="absolute left-0 top-full mt-3 w-44 rounded-xl bg-white shadow-lg border border-gray-200 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200">
              <ul className="py-2 text-sm text-gray-700">
                <Link
                  href="/#about"
                  className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  About
                </Link>
                <Link
                  href="/#faq"
                  className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  Faq
                </Link>
              </ul>
            </div>
          </li>
          <Link href="/buy" className="hover:text-blue-600 transition cursor-pointer">
            Buy
          </Link>
          <li
            onClick={() => handleAuthRedirect(router)}
            className="hover:text-blue-600 transition cursor-pointer"
          >
            Sell
          </li>
          <Link href="/contact" className="hover:text-blue-600 transition cursor-pointer">
            Contact
          </Link>
        </ul>
      </div>

      {/* Right Button (Desktop) */}
      <div className="hidden md:block">
        <button
          onClick={() => handleAuthRedirect(router)}
          className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-700 transition cursor-pointer"
        >
          My Domz
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center text-gray-800 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
  <div className="md:hidden absolute left-4 right-4 top-20 z-50">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">

      <ul className="flex flex-col gap-5 text-lg text-gray-800 font-medium">

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="block hover:text-blue-600 transition"
        >
          Home
        </Link>

        <Link
          href="/buy"
          onClick={() => setMenuOpen(false)}
          className="block hover:text-blue-600 transition"
        >
          Buy
        </Link>

        <button
          onClick={() => {
            handleAuthRedirect(router);
            setMenuOpen(false);
          }}
          className="text-left hover:text-blue-600 transition"
        >
          Sell
        </button>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="block hover:text-blue-600 transition"
        >
          Contact
        </Link>

      </ul>

      <button
        onClick={() => {
          handleAuthRedirect(router);
          setMenuOpen(false);
        }}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-full font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition"
      >
        My Domz
      </button>

    </div>
  </div>
)}
    </nav>
  )
}
export default Navbar
