'use client';

import {useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DomainTable from './DomainTable';
import Footer from '../../components/Footer';
import NavbarComponenet from '../../components/NavbarComponenet';

export default function DomainBuyClient() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const [searchQuery, setSearchQuery] = useState(filter ?? '');
  return (
    <div className="lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <NavbarComponenet
        text="Your Domain Search Starts at Domz"
        IsParaText={false}
        searchbarStatus={true}
        searchValue={searchQuery}
        onSearch={setSearchQuery}
      />
      <DomainTable searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}
