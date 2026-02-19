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
      <DomainTable searchQuery={searchQuery}/>
    <Footer />
    </div>
  );
}
