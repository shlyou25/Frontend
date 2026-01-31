"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { handleAuthRedirect } from "@/utils/checkAuth"


const AboutDomz = () => {
    const router=useRouter()
  return (
    <section className="relative min-h-225 overflow-hidden bg-white">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/assets/about-bg.png"
          alt="Domz network background"
          fill
          priority
          className="object-cover object-left"
        />

        {/* STRONG LEFT → RIGHT FADE (MATCHES IMAGE) */}
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/40 to-white/20" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">

          {/* LEFT: Buyer → Domz → Seller */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-xl rounded-2xl border bg-white shadow-xl p-6">

              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Buyer */}
                <div className="rounded-xl bg-gray-100 py-6">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                    1
                  </div>
                  <p className="font-semibold text-gray-800">Buyer</p>
                </div>

                {/* Domz */}
                <div className="rounded-xl bg-gray-900 py-6 text-white">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold">
                    2
                  </div>
                  <p className="font-semibold">Domz</p>
                </div>

                {/* Seller */}
                <div className="rounded-xl bg-gray-100 py-6">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                    3
                  </div>
                  <p className="font-semibold text-gray-800">Seller</p>
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-600">
                Domz connects buyers and sellers — without controlling the transaction.
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
              About Domz
            </span>

            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              A decentralized domain marketplace — without intermediaries
            </h2>

            <p className="mb-5 text-base leading-relaxed text-gray-700">
              <strong>Domz</strong> is a decentralized domain platform built to connect
              buyers and sellers directly. Unlike traditional marketplaces, Domz does
              not participate in negotiations, transfers, or payments.
            </p>

            <p className="mb-5 text-base leading-relaxed text-gray-700">
              Every domain listing points to a seller-controlled landing page.
              Buyers and sellers communicate one-to-one using a direct messaging
              system — ensuring full transparency and control.
            </p>

            <p className="mb-8 text-base leading-relaxed text-gray-700">
              Entire portfolios can be listed in seconds by simply entering a domain URL.
              No DNS changes. No manual updates. Changes made on the seller’s landing
              page are reflected automatically.
            </p>

            <div className="mb-10 rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-800">
                <strong>Zero commission.</strong> While traditional marketplaces charge
                up to <strong>30%</strong> per sale, Domz uses a fixed, minimal listing
                fee — regardless of the sale price.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/domainbuy"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Explore Domains
              </Link>

              <button
                  onClick={() => handleAuthRedirect(router)}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 hover:cursor-pointer"
              >
                List Your Domains
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutDomz
