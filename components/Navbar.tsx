"use client"
import React, { useState } from "react"
import Link from "next/link"
import logo from '../public/assets/logo.jpg'
import Image from "next/image"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className=" fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Domz Logo"
            width={100}
            height={100}
            className="object-contain"
            priority
          />
          {/* <span className="text-xl font-bold text-purple-600">Domz</span> */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-6 text-sm font-semibold text-gray-800">
          <Link href="#" className="hover:text-purple-600">Home</Link>
          <Link href="#" className="hover:text-purple-600">Buy</Link>
          <Link href="#" className="hover:text-purple-600">Sell</Link>
          <Link href="#" className="hover:text-purple-600">Contact</Link>
        </div>

        {/* Buttons (Desktop) */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            href="#"
            className="
    text-white
    font-semibold
    py-2
    px-8
    rounded-full
    bg-linear-to-b
    from-blue-500
    to-blue-700
    shadow-md
    transition
    duration-150
    hover:from-blue-600
    hover:to-blue-800
    text-center
    tracking-wide
    text-base
  "
          >
            My Domz
          </Link>


        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-purple-600 focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t shadow-md">
          <div className="flex flex-col items-start p-4 space-y-3 text-sm font-semibold text-gray-800">
            <Link href="#" className="hover:text-purple-600" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="#" className="hover:text-purple-600" onClick={() => setMenuOpen(false)}>Buy</Link>
            <Link href="#" className="hover:text-purple-600" onClick={() => setMenuOpen(false)}>Sell</Link>
            <Link href="#" className="hover:text-purple-600" onClick={() => setMenuOpen(false)}>Contact</Link>
            <div className="flex flex-col w-full border-t pt-3 space-y-2">
              <Link
                href="#"
                className="border px-4 py-2 rounded-lg text-center hover:text-purple-600 hover:border-purple-600"
              >
                My Domz
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
