import React from 'react';

interface DomainProps {
  name: string;
}

const Domain: React.FC<DomainProps> = ({ name }) => (
  <div className="rounded-2xl bg-white shadow-md w-72 py-7 px-2 flex flex-col items-center justify-center">
    <h5 className="text-2xl font-bold text-gray-900 mb-1">{name}</h5>
    <p className="text-gray-500 text-base">Promoted</p>
  </div>
);

export default Domain;
