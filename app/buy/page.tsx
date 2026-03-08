import { Suspense } from 'react';
import DomainBuyClient from './DomainBuyClient';

export const dynamic = 'force-static'; // SEO + static export safe

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <DomainBuyClient />
    </Suspense>
  );
}
