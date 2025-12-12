// Updated React dashboard layout matching the design shown
'use client'
import React, { useState } from 'react';
import Content from './content';

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen bg-[#F5F7FB]">
      {/* Mobile Hamburger */}
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out sm:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Content />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex sm:flex-col sm:w-64 sm:h-full sm:fixed sm:left-0 sm:top-0 bg-white shadow-md border-r">
        <Content />
      </aside>

      {/* Main Dashboard Content */}
      <main className="sm:ml-64 h-screen overflow-y-auto p-6">
        {/* TOP GRID CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-2xl font-bold">45</h2>
              <p className="text-green-500 text-sm">↑ 12%</p>
            </div>
            <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-lg">★</div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Domains Registered</p>
              <h2 className="text-2xl font-bold">0</h2>
              <p className="text-green-500 text-sm">↑ 20%</p>
            </div>
            <div className="bg-teal-500 text-white w-12 h-12 flex items-center justify-center rounded-lg">⬤</div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Query</p>
              <h2 className="text-2xl font-bold">50</h2>
              <p className="text-red-500 text-sm">↓ 10%</p>
            </div>
            <div className="bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-lg">👤</div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Requests</p>
              <h2 className="text-2xl font-bold">£10,000</h2>
              <p className="text-green-500 text-sm">↑ 10%</p>
            </div>
            <div className="bg-red-500 text-white w-12 h-12 flex items-center justify-center rounded-lg">💼</div>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Bar Chart Placeholder */}
          <div className="col-span-2 bg-white shadow-md rounded-xl p-6 h-[380px] flex items-center justify-center">
            <p className="text-gray-400">[ Bar Chart ]</p>
          </div>

          {/* Donut Chart */}
          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-4">Average Automation Cost</h3>
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-22 border-green-400"></div>
              <div className="absolute inset-4 rounded-full border-22 border-orange-300"></div>
              <div className="absolute inset-8 rounded-full border-22 border-red-400"></div>
              <div className="absolute inset-12 bg-white rounded-full flex items-center justify-center text-xl font-semibold">£143,000</div>
            </div>

            <div className="flex gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded-sm"></span> Easy 55%</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-300 rounded-sm"></span> Moderate 35%</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded-sm"></span> Difficult 10%</span>
            </div>
          </div>
        </div>

        {/* TABLE PLACEHOLDER */}
        <div className="bg-white shadow-md rounded-xl p-6 h-64 flex items-center justify-center mb-10">
          <p className="text-gray-400">[ Table Data ]</p>
        </div>
        
      </main>
    </div>
  );
}
