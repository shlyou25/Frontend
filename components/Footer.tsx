'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowUp } from 'lucide-react'
import { handleAuthRedirect } from '../utils/checkAuth'
import { usePathname } from 'next/navigation'
import Subscribe from "../utils/subscribe";
import logo from '../public/assets/logo.jpg'

const Footer = () => {
  const router = useRouter()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 150)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-start pt-1 w-fit">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-25 h-10">
                  <Image
                    src={logo}
                    alt="DOMZ"
                    fill
                    priority
                    sizes="100px"
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-xs text-gray-500 py-4">
                © 2026 Domz.com LLC
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-4">
              <div>
                <p className="font-medium text-gray-900">Company</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link href="/" className="hover:opacity-75">Home</Link></li>
                  <li><Link href="/#about" className="hover:opacity-75">About</Link></li>
                  <li><Link href="/#faq" className="hover:opacity-75">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-gray-900">Domains</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link href="/buy" className="hover:opacity-75">Buy Domains</Link></li>
                  <li
                    onClick={() => handleAuthRedirect(router)}
                    className="cursor-pointer hover:opacity-75"
                  >
                    Sell Domains
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900">Legal</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link href="/terms" className="hover:opacity-75">Terms</Link></li>
                  <li><Link href="/privacy" className="hover:opacity-75">Privacy</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900">Support</p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li><Link href="/contact" className="hover:opacity-75">Contact</Link></li>
                  <li className="group relative inline-block">
                    <a
                      href="mailto:media@domz.com"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:opacity-75 transition"
                    >
                      Advertise
                    </a>
                    <div
                      className="
        pointer-events-none
        absolute left-1/2 -translate-x-1/2 top-full mt-2
        opacity-0 group-hover:opacity-100
        transition
        z-20
      "
                    >
                      <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                        media@domz.com
                      </div>
                    </div>
                  </li>
                  <li><a href="https://buy.stripe.com/5kQeVf3CAaQQe6z5tAbo401" className="hover:opacity-75">Sponsor</a></li>
                  <li><Link href="/contact/#subscribe" className="hover:opacity-75">Subscribe</Link></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </footer>

      {(pathname === "/" || pathname==='/buy') && showScrollTop && (
        <a
          href="#navbar"
          aria-label="Scroll to top"
          className="
            fixed bottom-6 right-6 z-50
            flex h-12 w-12 items-center justify-center
            rounded-full bg-gray-900 text-white
            shadow-lg transition-all
            hover:bg-gray-700 hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-gray-400
          "
        >
          <ArrowUp size={20} />
        </a>
      )}
      <Subscribe
        forceOpen={subscribeOpen}
        onCloseExternal={() => setSubscribeOpen(false)}
      />
    </>
  )
}

export default Footer