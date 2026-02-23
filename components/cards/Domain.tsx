'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface DomainProps {
  name: string;
}

const Domain: React.FC<DomainProps> = ({ name }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/domainbuy?filter=${encodeURIComponent(name)}`)
      }
      className="
    group
    rounded-2xl
    bg-white
    w-72
    py-7 px-4
    flex flex-col items-center justify-center
    cursor-pointer
    border border-gray-100
    shadow-[0_6px_20px_rgba(0,0,0,0.06)]
    transition-all duration-200
    hover:-translate-y-1
    hover:shadow-[0_14px_40px_rgba(37,99,235,0.15)]
  "
    >
      <h5 className="text-2xl font-semibold text-gray-900 mb-1 tracking-tight">
        {name}
      </h5>

      <p className="
    text-xs
    font-medium
    text-gray-400
    group-hover:text-gray-500
    transition
    tracking-wide
  ">
        Promoted
      </p>
    </div>
  );
};

export default Domain;
