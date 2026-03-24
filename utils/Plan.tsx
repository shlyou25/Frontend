// 'use client'
// import axios from "axios"
// import { useState } from "react"
// import { toast } from "react-toastify"

// type Package = {
//   title: string
//   price: number
//   per: string
//   feature: number
// }

// const packages: Package[] = [
//   { title: "Starter", price: 0.99, per: "Month", feature: 5 },
//   { title: "Basic", price: 4.99, per: "Month", feature: 100 },
//   { title: "Business", price: 9.99, per: "Month", feature: 500 },
//   { title: "Premium", price: 14.99, per: "Month", feature: 1000 },
//   { title: "Platinum", price: 19.99, per: "Month", feature: 2000 },
//   { title: "Gold", price: 24.99, per: "Month", feature: 5000 },
// ]

// export default function Pricing() {
//   const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

//   const handleUpgrade = async (planTitle: string) => {
//     if (loadingPlan) return
//     setLoadingPlan(planTitle)
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_apiLink}planrequest/upgreadplan`,
//         { planTitle },
//         { withCredentials: true }
//       ) 
//       toast.success(res.data.message || "Upgrade request submitted")
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || "Failed to submit upgrade request"
//       )
//     } finally {
//       setLoadingPlan(null)
//     }
//   }

//   return (
//     <section id="plan" className="relative bg-white px-6 py-5 sm:py-5 lg:px-8">
//       {/* HEADER */}
//       <div className="mx-auto max-w-4xl text-center">
//         <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
//         <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//           Simple, transparent pricing
//         </p>
//         <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
//           Choose the plan that fits your scale. Upgrade anytime.
//         </p>
//       </div>
//       <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {packages.map((pkg) => {
//           const isLoading = loadingPlan === pkg.title

//           return (
//             <div
//               key={pkg.title}
//               className={`relative rounded-3xl p-8 bg-white transition shadow-sm hover:shadow-lg
//                 ${pkg.title === "Business"
//                   ? "border-2 border-indigo-600"
//                   : "border border-gray-200"
//                 }`}
//             >
//               {pkg.title === "Business" && (
//                 <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
//                   Most Popular
//                 </span>
//               )}

//               <h3 className="text-lg font-semibold text-gray-900">
//                 {pkg.title}
//               </h3>

//               <div className="mt-4 flex items-baseline gap-x-2">
//                 <span className="text-4xl font-bold text-gray-900">
//                   ${pkg.price}
//                 </span>
//                 <span className="text-sm text-gray-500">/{pkg.per}</span>
//               </div>

//               <p className="mt-4 text-sm text-gray-600">
//                 Manage up to{" "}
//                 <span className="font-semibold text-gray-900">
//                   {pkg.feature}
//                 </span>{" "}
//                 domains.
//               </p>
//               <button
//                 disabled={isLoading}
//                 onClick={() => handleUpgrade(pkg.title)}
//                 className={`mt-8 w-full rounded-md px-4 py-3 text-sm font-semibold text-white transition
//                   ${pkg.title === "Business"
//                     ? "bg-indigo-600 hover:bg-indigo-500"
//                     : "bg-gray-900 hover:bg-gray-800"
//                   }
//                   ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
//                 `}
//               >
//                 {isLoading ? "Submitting..." : "Upgrade Plan"}
//               </button>
//             </div>
//           )
//         })}
//       </div>
//     </section>
//   )
// }


'use client'

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { PlanCardInterface } from "@/components/plan/plancard"
import Link from "next/link"

type Props = {
  planinfo?: PlanCardInterface
}

export default function PartnerDomz({ planinfo }: Props) {
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    domains: "",
    sellerType: "",
    website: "",
    social: "",
    marketplace: "",
    portfolio: "",
    comments: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}planrequest/addplanrequest`,
        form,
        { withCredentials: true }
      )

      toast.success(res.data.message || "Application submitted successfully")

      setForm({
        name: "",
        email: "",
        phone: "",
        domains: "",
        sellerType: "",
        website: "",
        social: "",
        marketplace: "",
        portfolio: "",
        comments: ""
      })

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Submission failed")
    } finally {
      setLoading(false)
    }
  }
  if (planinfo) 
  return (
    <p className="mt-6 text-lg text-gray-600 leading-relaxed text-center">
      You already have an active plan. To request changes, use the{" "}
      <Link href="/contact" className="text-blue-600 hover:underline cursor-pointer">
        Contact
      </Link>{" "}
      submission form.
    </p>
  );
  return (
    <section className="bg-white px-6 lg:px-8 pb-20" id="plan">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Partner with Domz
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed text-left">
          Domz features a curated selection of portfolios from established
          domain investors. By working with vetted sellers, buyers can
          confidently discover domains and connect directly with sellers.
        </p>

        <p className="mt-4 text-gray-600 text-lg text-left">
          There is no charge to list. Domz is supported through
          non-intrusive ads, featured domain promotion and affiliate programs.
        </p>

        <p className="mt-4 text-gray-600 text-lg text-left">
          If you would like your portfolio to be considered, complete the
          application form below.
        </p>
        {showForm ? <button
          onClick={() => setShowForm(!showForm)}
          className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-md font-semibold transition cursor-pointer"
        >
          Cancel
        </button> :
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-md font-semibold transition curor-po"
          >
            Apply Now
          </button>
        }

      </div>


      {showForm &&

        <div className="mt-16 max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Portfolio Submission
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            {/* Email */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            {/* Phone */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number (optional)
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            {/* Domains */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estimated Number of Domains
              </label>

              <select
                required
                name="domains"
                value={form.domains}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1,000</option>
                <option value="5000+">5,000+</option>
              </select>
            </div>


            {/* Seller type */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Are You a Broker or Private Seller?
              </label>

              <select
                required
                name="sellerType"
                value={form.sellerType}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Broker">Broker</option>
                <option value="Private Seller">Private Seller</option>
              </select>
            </div>


            {/* Website */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Website
              </label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            {/* Social */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Business Social Media Links
              </label>
              <input
                name="social"
                value={form.social}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            {/* Marketplace */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Public Marketplace Username (NamePros etc)
              </label>
              <input
                name="marketplace"
                value={form.marketplace}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            {/* Portfolio */}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Portfolio URL
              </label>
              <input
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Comments
              </label>
              <textarea
                name="comments"
                rows={4}
                value={form.comments}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


            {/* Submit */}

            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

          </form>

        </div>
      }

    </section>
  )
}
