'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DomainTable from './DomainTable';
import Footer from '../../components/Footer';
import NavbarComponenet from '../../components/NavbarComponenet';

export default function DomainBuyClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  useEffect(() => {
    if (filter) {
      setSearchQuery(filter);
    }
  }, [filter]);

return (
    <div className="lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <NavbarComponenet
        colorText="Your Do"
        plainText="main Search Starts at Domz"
        IsParaText={true}
        ParaText="Browse a commission-free catalog and connect directly with domain owners."
        searchbarStatus={true}
        onSearch={setSearchQuery}
      />

      <DomainTable searchQuery={searchQuery} />

      <div className="w-full px-2 py-12 bg-blue-50 flex flex-col items-center rounded-3xl">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-2 mt-2">
          <span className="text-blue-600 font-semibold">How </span>
          <span className="font-semibold">Domz.com</span>
          <span className="font-normal"> Benefits Both Sellers and Buyers</span>
        </h2>

        <p className="text-base text-gray-600 text-center max-w-2xl mb-8">
          Our domain catalog is designed to remove the friction of traditional marketplaces that frustrates both sides.
        </p>
      </div>

      <Footer />
    </div>
  );
}
