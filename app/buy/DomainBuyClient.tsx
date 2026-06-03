// 'use client';

// import {useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import DomainTable from './DomainTable';
// import Footer from '../../components/Footer';
// import NavbarComponenet from '../../components/NavbarComponenet';

// export default function DomainBuyClient() {
//   const searchParams = useSearchParams();
//   const filter = searchParams.get('filter');
//   const [searchQuery, setSearchQuery] = useState(filter ?? '');
//   return (
//     <div className="lg:pl-[10%] lg:pr-[10%] lg:pt-9">
//       <NavbarComponenet
//         text="Your Domain Search Starts at Domz"
//         IsParaText={false}
//         searchbarStatus={true}
//         searchValue={searchQuery}
//         onSearch={setSearchQuery}
//       />
//       <DomainTable searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
//       <Footer />
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DomainTable from './DomainTable';
import Footer from '../../components/Footer';
import NavbarComponenet from '../../components/NavbarComponenet';

export default function DomainBuyClient() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';

  // What user is typing
  const [searchInput, setSearchInput] = useState(filter);

  // Debounced value used for API calls
  const [searchQuery, setSearchQuery] = useState(filter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className="lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <NavbarComponenet
        text="Your Domain Search Starts at Domz"
        IsParaText={false}
        searchbarStatus={true}
        searchValue={searchInput}
        onSearch={setSearchInput}
      />

      <DomainTable
        searchQuery={searchQuery}
        setSearchQuery={setSearchInput}
      />

      <Footer />
    </div>
  );
}