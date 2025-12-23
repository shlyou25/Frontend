'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Content from './content';
import Loader from '@/components/Loader';
import Table from '@/utils/Table';

interface User {
  _id: string;
  email: string;
  name?: string;        // optional
  phoneNumber?: string; // optional
}
interface Domain {
  domain: string;
  createdAt: string;
}

interface DomainsResponse {
  success: boolean;
  count: number;
  domains: Domain[];
}
const Page = () => {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [domainsData, setDomainsData] = useState<DomainsResponse | null>(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}auth/me`,
          { withCredentials: true }
        );
        if (res.data?.user?.role !== 'admin') {
          router.replace('/login');
          return;
        }
        setLoading(false);
      } catch {
        router.replace('/login');
      }
    };

    checkAdminAuth();
  }, [router]);
  
useEffect(()=>{
    const fetchAllUser=async ()=>{
      try {
        const res=await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}user/allusers`,
          {withCredentials:true}
        )
        .then((res:any)=>setAllUsers(res.data.users)
        )
      } catch (error) {
        toast.error('Error Fetching Users')
      }
    }
    fetchAllUser();
},[router])

useEffect(()=>{
    const fetchAlldomain=async ()=>{
      try {
        const res=await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}domain/getalldomains`,
          {withCredentials:true}
        )
        .then((res:any)=>setDomainsData(res.data)
        )
      } catch (error) {
        toast.error('Error Fetching Domains')
      }
    }
    fetchAlldomain();
},[router])

  if (loading) return <Loader />;
  return (
    <div className="relative h-screen bg-[#F5F7FB]">
      {/* Mobile Hamburger */}
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 sm:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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

      {/* Main Content */}
      <main className="sm:ml-64 h-screen overflow-y-auto p-6">
        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { label: 'Total Users', value: allUsers?.length, change: '↑ 12%', color: 'bg-blue-500' },
            { label: 'Domains Registered', value: domainsData?.count, change: '↑ 20%', color: 'bg-teal-500' },
            { label: 'Query', value: '50', change: '↓ 10%', color: 'bg-orange-500' },
            { label: 'Requests', value: '£10,000', change: '↑ 10%', color: 'bg-red-500' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h2 className="text-2xl font-bold">{item.value}</h2>
                <p className="text-sm text-green-500">{item.change}</p>
              </div>
              <div
                className={`${item.color} text-white w-12 h-12 flex items-center justify-center rounded-lg`}
              >
                ★
              </div>
            </div>
          ))}
        </div>
        <Table/>

        {/* TABLE */}
        <div className="bg-white shadow-md rounded-xl p-6 h-64 flex items-center justify-center mb-10">
          <p className="text-gray-400">[ Table Data ]</p>
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default Page;
