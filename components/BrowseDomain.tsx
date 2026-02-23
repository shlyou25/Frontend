'use client'
import React, { useEffect, useState } from 'react';
import Domain from './cards/Domain';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface domainInterface {
  domain: string,
  domainId: string,
  priority: number
}
const BrowseDomain = () => {
  const [promotedDomain, setPromotedDomain] = useState<domainInterface[]>([]);
  const [filter, setFilter] = useState('')
  const router = useRouter();
  useEffect(() => {
    const fetchPromotedDomain = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}domain/promoted`
        )
        setPromotedDomain(res.data.domains);
      } catch (err) {
      }
    }
    fetchPromotedDomain();
  }, [])
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/domainbuy?filter=${encodeURIComponent(filter)}`);
  };
  return (
    <section className="py-20 px-6">

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-slate-900 text-3xl md:text-5xl font-semibold mb-4">
          Find Your Perfect Domain, Instantly
        </h2>
        <p className="text-base text-slate-600 mb-8">
          Browse available domains and connect directly with sellers.
        </p>

        <form className="max-w-xl mx-auto mt-8" onSubmit={onSubmitHandler}>
          <div className="relative">
            <input
              type="search"
              placeholder="Search Domains..."
              required
              onChange={(e) => setFilter(e.target.value)}
              className="w-full h-14 pl-12 pr-32 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 w-full">
          {promotedDomain?.map((domain) => (
            <Domain name={domain.domain} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default BrowseDomain
