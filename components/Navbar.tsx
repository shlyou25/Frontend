"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { handleAuthRedirect } from "@/utils/checkAuth"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <nav className="w-full flex justify-between items-center px-6 lg:px-20 py-4 relative z-50">
      <Link href="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Image
            src="/assets/logo.jpg"
            alt="Domz Logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex bg-white/70 backdrop-blur-lg shadow-sm px-6 py-2 rounded-full border border-gray-200">
        <ul className="flex items-center space-x-8 text-gray-800 font-medium">
          <li className="relative group">
            <Link href="/" className="hover:text-blue-600 transition cursor-pointer">
              Home
            </Link>
            <div className="absolute left-0 top-full mt-3 w-44 rounded-xl bg-white shadow-lg border border-gray-200 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200">
              <ul className="py-2 text-sm text-gray-700">
                <Link
                  href="#faq"
                  className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  FAQ
                </Link>
                <Link
                  href="#demo"
                  className="block px-4 py-2 hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  Demo
                </Link>
              </ul>
            </div>
          </li>


          <Link href="/domainbuy" className="hover:text-blue-600 transition cursor-pointer">
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
          <Link href="/about" className="hover:text-blue-600 transition cursor-pointer">
            About
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
        <div className="absolute top-full left-0 w-full bg-white shadow-md border-t md:hidden animate-slide-down">
          <ul className="flex flex-col items-start p-4 space-y-4 text-gray-800 font-medium">
            <li className="hover:text-blue-600 w-full" onClick={() => setMenuOpen(false)}>
              Home
            </li>
            <Link
              href="/domainbuy"
              className="hover:text-blue-600 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Buy
            </Link>
            <li
              className="hover:text-blue-600 w-full cursor-pointer"
              onClick={() => {
                setMenuOpen(false)
                handleAuthRedirect(router)
              }}
            >
              Sell
            </li>
            <li className="hover:text-blue-600 w-full" onClick={() => setMenuOpen(false)}>
              Contact
            </li>
            <button
              onClick={() => {
                setMenuOpen(false)
                handleAuthRedirect(router)
              }}
              className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-700 transition w-full"
            >
              My Domz
            </button>
          </ul>
        </div>
      )}
    </nav>
  )
}
export default Navbar
