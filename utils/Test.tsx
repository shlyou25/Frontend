'use client'

import { CheckIcon } from "@heroicons/react/20/solid"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

type Package = {
  title: string
  price: number
  per: string
  feature: number
}

const packages: Package[] = [
  { title: "Starter", price: 0.99, per: "Month", feature: 5 },
  { title: "Basic", price: 4.99, per: "Month", feature: 100 },
  { title: "Business", price: 9.99, per: "Month", feature: 500 },
  { title: "Premium", price: 14.99, per: "Month", feature: 1000 },
  { title: "Platinum", price: 19.99, per: "Month", feature: 2000 },
  { title: "Gold", price: 24.99, per: "Month", feature: 5000 },
]

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleUpgrade = async (planTitle: string) => {
    if (loadingPlan) return
    setLoadingPlan(planTitle)
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}planrequest/upgreadplan`,
        { planTitle },
        { withCredentials: true }
      ) 
      toast.success(res.data.message || "Upgrade request submitted")
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to submit upgrade request"
      )
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <section className="relative bg-white px-6 py-5 sm:py-5 lg:px-8">
      {/* HEADER */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Simple, transparent pricing
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Choose the plan that fits your scale. Upgrade anytime.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => {
          const isLoading = loadingPlan === pkg.title

          return (
            <div
              key={pkg.title}
              className={`relative rounded-3xl p-8 bg-white transition shadow-sm hover:shadow-lg
                ${pkg.title === "Business"
                  ? "border-2 border-indigo-600"
                  : "border border-gray-200"
                }`}
            >
              {pkg.title === "Business" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-gray-900">
                {pkg.title}
              </h3>

              <div className="mt-4 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${pkg.price}
                </span>
                <span className="text-sm text-gray-500">/{pkg.per}</span>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Manage up to{" "}
                <span className="font-semibold text-gray-900">
                  {pkg.feature}
                </span>{" "}
                domains.
              </p>

              {/* <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-x-3">
                  <CheckIcon className="h-5 w-5 text-indigo-600" />
                  {pkg.feature} domains included
                </li>
                <li className="flex items-center gap-x-3">
                  <CheckIcon className="h-5 w-5 text-indigo-600" />
                  Priority scanning
                </li>
                <li className="flex items-center gap-x-3">
                  <CheckIcon className="h-5 w-5 text-indigo-600" />
                  Email support
                </li>
              </ul> */}

              <button
                disabled={isLoading}
                onClick={() => handleUpgrade(pkg.title)}
                className={`mt-8 w-full rounded-md px-4 py-3 text-sm font-semibold text-white transition
                  ${pkg.title === "Business"
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "bg-gray-900 hover:bg-gray-800"
                  }
                  ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {isLoading ? "Submitting..." : "Upgrade Plan"}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
