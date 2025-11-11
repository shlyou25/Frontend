import React from 'react';
import Domain from './cards/Domain';

const BrowseDomain: React.FC = () => (
  <div className="bg-linear-to-b from-blue-100 via-blue-50 to-white py-10 px-[2%] rounded-2xl">
    <div className="max-w-4xl w-full mx-auto text-center">
      <h2 className="text-slate-900 text-3xl md:text-5xl font-semibold mb-4">
        Find Your Perfect Domain, Instantly
      </h2>
      <p className="text-base text-slate-600 mb-8">
        Browse available domains and connect directly with sellers.
      </p>

      <form className="max-w-md mx-auto">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 w-full">
  <Domain name="Example.com" />
  <Domain name="Example.com" />
  <Domain name="Example.com" />
</div>

    </div>
  </div>
);

export default BrowseDomain;
