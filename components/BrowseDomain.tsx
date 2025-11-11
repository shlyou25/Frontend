import React from 'react';

interface DomainProps {
  name: string;
}

const Domain: React.FC<DomainProps> = ({ name }) => (
  <div className="w-full md:w-[300px] rounded-2xl bg-white shadow-md py-7 px-4 flex flex-col items-center justify-center mb-4 last:mb-0">
    <h5 className="text-2xl font-bold text-gray-900 mb-1 text-center">{name}</h5>
    <p className="text-gray-500 text-base text-center">Promoted</p>
  </div>
);

const BrowseDomain: React.FC = () => (
  <div className="
    w-full max-w-md mx-auto
    bg-gradient-to-b from-blue-100 to-white
    rounded-xl p-4
    shadow-lg
    flex flex-col items-center
  ">
    <h2 className="text-slate-900 text-2xl md:text-3xl font-bold leading-tight mb-4 text-center">
      Find Your Perfect Domain, Instantly
    </h2>
    <p className="text-base text-slate-600 text-center mb-6">
      Browse available domains and connect directly with sellers.
    </p>
    <form className="w-full mb-8">
  <div className="rounded-full shadow-lg bg-white flex flex-col items-stretch p-2 mb-4">
    <input
      type="text"
      placeholder="example.com"
      className="w-full outline-none border-none bg-transparent px-4 py-3 text-base md:text-lg text-gray-700 rounded-full mb-3"
    />
    <button
      type="submit"
      className="
        bg-blue-600 hover:bg-blue-700 text-white font-bold
        rounded-full shadow w-full
        py-2 text-base
        md:py-3 md:text-lg
        transition
      "
    >
      Search
    </button>
  </div>
</form>

    <div className="w-full flex flex-col items-center">
      <Domain name="Example.com" />
      <Domain name="Example.com" />
      <Domain name="Example.com" />
    </div>
  </div>
);

export default BrowseDomain;
