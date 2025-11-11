"use client"
import Image from "next/image"
import React, { useState } from "react"

export interface NavbarTextProp {
  colorText: string;
  plainText:string;
}

const NavbarComponenet = (props:NavbarTextProp) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-linear-to-b from-white to-blue-50 w-full lg:pb-16">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex items-center h-20 px-6 lg:px-20 relative z-50" style={{display: 'grid', gridTemplateColumns: '1fr 2fr 1fr'}}>
        {/* Logo - Left */}
        <div className="flex items-center">
          <Image
            src="/assets/logo.jpg"
            alt="Domz Logo"
            width={110}
            height={38}
            className="object-contain"
            priority
          />
        </div>
        {/* Center menu */}
        <div className="hidden md:flex justify-center">
          <ul className="flex items-center gap-8 text-gray-900 font-sans font-normal text-[16px] tracking-wide">
            <li className="hover:text-blue-600 transition cursor-pointer">Home</li>
            <li className="hover:text-blue-600 transition cursor-pointer">Buy</li>
            <li className="hover:text-blue-600 transition cursor-pointer">Sell</li>
            <li className="hover:text-blue-600 transition cursor-pointer">Contact</li>
          </ul>
        </div>
        {/* Right button */}
        <div className="hidden md:flex justify-end">
          <button className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition text-[16px]">
            My Domz
          </button>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center absolute right-6 top-6 text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md border-t md:hidden animate-slide-down">
            <ul className="flex flex-col items-start p-4 space-y-4 text-gray-800 font-medium">
              <li className="hover:text-blue-600 w-full" onClick={() => setMenuOpen(false)}>Home</li>
              <li className="hover:text-blue-600 w-full" onClick={() => setMenuOpen(false)}>Buy</li>
              <li className="hover:text-blue-600 w-full" onClick={() => setMenuOpen(false)}>Sell</li>
              <li className="hover:text-blue-600 w-full" onClick={() => setMenuOpen(false)}>Contact</li>
              <button className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-blue-600 hover:to-blue-700 transition w-full">
                My Domz
              </button>
            </ul>
          </div>
        )}
      </nav>

      {/* Signup heading - centered, styled */}
      <div className="w-full flex flex-col items-center mt-16">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-blue-600">{props?.colorText}</span>
          <span className="text-black">{props.plainText}</span>
        </h1>
      </div>
    </div>
  )
}

export default NavbarComponenet
