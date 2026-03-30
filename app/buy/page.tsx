import { Suspense } from 'react';
import DomainBuyClient from './DomainBuyClient';
import type { Metadata } from "next";

export const dynamic = 'force-static'; 

export const metadata: Metadata = {
  title: "Domz.com | Buy Domains",
  description:
    "Browse a curated domain marketplace where trusted investors list domain name portfolios. Discover premium names, connect directly with sellers, and close deals commission-free.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <DomainBuyClient />
    </Suspense>
  );
}