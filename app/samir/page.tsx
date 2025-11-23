'use client'
import React, { useState } from 'react';
import Content from './content';

const Page: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen bg-neutral-100">
      {/* Hamburger for mobile */}
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
        className="text-heading bg-transparent border-0 focus:ring-2 focus:ring-neutral-tertiary rounded-base m-4 text-xl p-2 outline-none inline-flex sm:hidden fixed top-4 left-4 z-50"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
        </svg>
      </button>

      {/* Overlay & Sidebar for mobile */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 sm:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside
            className={`
              fixed top-0 left-0 z-50 w-64 h-full bg-white border-e border-default 
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              sm:hidden
            `}
            aria-label="Sidebar"
          >
            <div className="flex justify-end">
              <button
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
                className="p-2 m-2"
              >
                <svg className="w-6 h-6" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Content />
          </aside>
        </>
      )}

      {/* Static/fixed sidebar for desktop */}
      <aside
        className={`
          hidden sm:fixed sm:inset-y-0 sm:left-0 sm:z-30 sm:flex sm:w-64 sm:flex-col
          sm:bg-white sm:border-e sm:border-default
        `}
        aria-label="Sidebar"
      >
        <Content />
      </aside>
      {/* Page content, scrollable, adjusts left margin for sidebar on desktop */}
      <main
        className={`
          flex flex-col h-screen overflow-hidden
          ${"sm:ml-64"}
        `}
      >
        <div className="flex-1 overflow-y-auto p-4">
          <div className="p-4 border border-default border-dashed rounded-base">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
               <div className="flex items-center justify-center h-24 rounded-base bg-neutral-secondary-soft">
                <p className="text-fg-disabled">
                  <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 rounded-base bg-neutral-secondary-soft mb-4">
              <p className="text-fg-disabled">
                <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
