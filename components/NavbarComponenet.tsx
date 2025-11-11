"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link";
export type NavbarTextProp =
  | {
    colorText: string;
    plainText: string;
    IsParaText: true;
    ParaText: string;
  }
  | {
    colorText: string;
    plainText: string;
    IsParaText: false;
  };


const NavbarComponenet = (props: NavbarTextProp) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-linear-to-b from-white to-blue-50 w-full lg:pb-16 sticky top-0 z-40 ">
      <nav className="max-w-7xl mx-auto flex items-center h-20 px-6 lg:px-20 relative z-50" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr' }}>
        <Link href={'/'} className="flex items-center">
          <Image
            src="/assets/logo.jpg"
            alt="Domz Logo"
            width={110}
            height={38}
            className="object-contain"
            priority
          />
        </Link>
        <div className="hidden md:flex justify-center">
          <ul className="flex items-center gap-8 text-gray-900 font-sans font-normal text-[16px] tracking-wide">
            <Link href={'/'} className="hover:text-blue-600 transition cursor-pointer">Home</Link>
            <li className="hover:text-blue-600 transition cursor-pointer">Buy</li>
            <li className="hover:text-blue-600 transition cursor-pointer">Sell</li>
            <li className="hover:text-blue-600 transition cursor-pointer">Contact</li>
          </ul>
        </div>
        <Link href={'/portfolio'} className="hidden md:flex justify-end">
          <button className="bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:from-blue-600 hover:to-blue-700 transition text-[16px]">
            My Domz
          </button>
        </Link>
        <button
          className="md:hidden flex items-center absolute right-6 top-6 text-gray-800 focus:outline-none"
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
      <div>
        {props?.IsParaText &&
          <div className="w-full flex flex-col items-center py-6">
            <div className="mb-3 text-center text-black">
             {props?.ParaText}
            </div>
            <div className="flex items-center w-full max-w-xl rounded-full bg-white shadow-lg px-4 py-2">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 bg-white outline-none rounded-full text-gray-400 text-base px-2 py-1"
              />
              <div className="bg-white rounded-full flex items-center justify-center ml-2 w-9 h-9 shadow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px" className="fill-gray-600">
                  <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                  </path>
                </svg>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default NavbarComponenet
