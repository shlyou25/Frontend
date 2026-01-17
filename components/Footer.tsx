'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { handleAuthRedirect } from '@/utils/checkAuth'
import { useRouter } from 'next/navigation'


const Footer = () => {
  const router=useRouter();
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 lg:py-16 sm:px-6 lg:space-y-16 lg:px-8 sm:mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-teal-600">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/assets/logo.jpg"
                  alt="DOMZ"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </Link>
            </div>
            <p className="mt-4 max-w-xs text-left">
              Learn more about our mission, our features, and how we're dedicated to providing exceptional
              domain name related services
            </p>
            <ul className="mt-8 flex gap-6">
              <li>
                <a href="1" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Facebook</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule={"evenodd"} ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="1" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Instagram</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule={"evenodd"}></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="1" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Twitter</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.53 2H21.21L14.29 10.14L22.45 21.97H15.84L10.88 15.34L5.24 21.97H1.54L8.87 13.34L1 2.01H7.84L12.36 8.01L17.53 2ZM16.27 19.94H18.21L7.92 4.05H5.91L16.27 19.94Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="1" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.834 20h-3.331v-10h3.331v10zm-1.666-11.267c-1.065 0-1.933-.87-1.933-1.934 0-1.065.868-1.932 1.933-1.932s1.934.867 1.934 1.932c0 1.064-.869 1.934-1.934 1.934zm15.5 11.267h-3.332v-5.604c0-1.336-.023-3.055-1.864-3.055-1.865 0-2.151 1.453-2.151 2.954v5.705h-3.331v-10h3.198v1.367h.046c.445-.847 1.531-1.742 3.153-1.742 3.375 0 3.999 2.222 3.999 5.106v5.269z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href="/" className="text-gray-700 transition hover:opacity-75"> Home </Link>
                </li>

                <li>
                  <Link href={'/about'} className="text-gray-700 transition hover:opacity-75"> About </Link>
                </li>

                <li>
                  <a href="#faq" className="text-gray-700 transition hover:opacity-75">
                    FAQ
                  </a>
                </li>

                <li>
                  <Link href="/plan" className="text-gray-700 transition hover:opacity-75"> Plan </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href={'/'} className="text-gray-700 transition hover:opacity-75"> Demo </Link>
                </li>

                <li>
                  <Link href={'/'} className="text-gray-700 transition hover:opacity-75">Figures</Link>
                </li>

                <li>
                  <Link href={'/'} className="text-gray-700 transition hover:opacity-75">
                    Recources
                  </Link>
                </li>
                <li>
                  <Link href={'/contact'} className="text-gray-700 transition hover:opacity-75">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900">Info</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link href={'/'} className="text-gray-700 transition hover:opacity-75"> Terms </Link>
                </li>
                <li>
                  <Link href={'/'} className="text-gray-700 transition hover:opacity-75"> Privacy policy </Link>
                </li>

                <li>
                  <Link href={'/'} className="text-gray-700 transition hover:opacity-75"> Support </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">DOMZ</p>

              <ul className="mt-6 space-y-4 text-sm">

                <li>
                  <Link href={'/domainbuy'} className="text-gray-700 transition hover:opacity-75"> Buy </Link>
                </li>
                <li
                  onClick={() => handleAuthRedirect(router)}
                  className="text-gray-700 transition hover:opacity-75"
                >
                  Sell
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-black">© 2025. domz.com. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer