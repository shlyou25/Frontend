'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from "react-toastify";
import Content from './content';
import Loader from '@/components/Loader';
import Table from '@/utils/Table';
import DomainTable from './DomainTable';
import PlanTable, { PlansResponse } from './PlanTable';
import Faq from './Faq';
import UserTable from './UserTable';

type AdminView = "dashboard" | "Users" | "domains" | "Plans" | "Faq";


export interface UserPlan {
  title: string;
  feature: number;
  status: "active" | "expired" | "cancelled";
  endingDate: string;
  plan?: UserPlan | null;
}

export interface UserInterface {
  _id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  createdAt: string;
  isActive: boolean;
  plan?: UserPlan | null;
}

interface DomainsResponse {
  success: boolean;
  count: number;
  manualReviewCount: number;
  domains: Array<{
    domainId: string;
    domain: string;
    status: "Pass" | "Manual Review";
    finalUrl: string | null;
    createdAt: string;
    owner: {
      name: string;
      email: string;
    };
  }>;
}


const Page = () => {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isauthenciated, setisAuthenciated] = useState(false);

  const [activeView, setActiveView] = useState<AdminView>("dashboard");

  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const [refreshUsers, setRefreshUsers] = useState(0);
  const [domainsData, setDomainsData] = useState<DomainsResponse | null>(null);
  const [allPlans, setallPlans] = useState<PlansResponse>()
  const [refreshPlans, setRefreshPlans] = useState(0);



  // 🔐 AUTH CHECK
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}auth/me`,
          { withCredentials: true }
        );
        if (res.data?.user?.role !== "admin") {
          router.replace("/login");
          return;
        }
        setisAuthenciated(true);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAdminAuth();
  }, [router]);

  // 👥 USERS
  useEffect(() => {
    if (!isauthenciated) return;
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}user/allusers`,
          { withCredentials: true }
        );
        setAllUsers(res.data.users);
      } catch {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, [isauthenciated, refreshUsers]);

  // 🌐 DOMAINS
  useEffect(() => {
    if (!isauthenciated) return;

    const fetchDomains = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}domain/getalldomains`,
          { withCredentials: true }
        );
        setDomainsData(res.data);
      } catch {
        toast.error("Error fetching domains");
      }
    };
    fetchDomains();
  }, [isauthenciated]);

  useEffect(() => {
    if (!isauthenciated) return;
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}plan/allplans`,
          { withCredentials: true }
        );
        setallPlans(res.data);
      } catch (error) {
        toast.error("Error Fetching Plans")
      }
    };
    fetchPlans();
  }, [isauthenciated,refreshPlans])
  console.log(domainsData,"domainsDatadomainsDatadomainsData");
  
  if (loading) return <Loader />;
  return (
    <div className="relative h-screen bg-[#F5F7FB]">
      {/* MOBILE HAMBURGER */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        ☰
      </button>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transition-transform sm:hidden
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Content activeView={activeView} setActiveView={setActiveView} />
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden sm:flex sm:w-64 sm:h-full sm:fixed bg-white border-r">
        <Content activeView={activeView} setActiveView={setActiveView} />
      </aside>

      {/* MAIN CONTENT */}
      <main className="sm:ml-64 p-6 overflow-y-auto h-screen">
        {/* DASHBOARD */}
        {activeView === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { label: 'Total Users', value: allUsers.length, color: 'bg-blue-500' },
                { label: 'Domains Registered', value: domainsData?.count, color: 'bg-teal-500' },
                { label: 'Manual Review', value:domainsData?.manualReviewCount, color: 'bg-orange-500' },
                { label: 'Requests', value: '£10,000', color: 'bg-red-500' },
              ].map(item => (
                <div key={item.label} className="bg-white p-5 rounded-xl shadow flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <h2 className="text-2xl font-bold">{item.value}</h2>
                  </div>
                  <div className={`${item.color} w-12 h-12 rounded-lg`} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* IDEAS */}
        {activeView === "dashboard" && <Table />}
        {activeView === "Users" && <UserTable data={allUsers}
          onRefresh={() => setRefreshUsers(prev => prev + 1)}
        />}
        {/* DOMAINS */}
        {activeView === "domains" && domainsData?.domains && (
          <div className="bg-white p-6 rounded-xl shadow">
            <DomainTable data={domainsData.domains} />
          </div>
        )}
        {activeView === "Plans" && allPlans?.plans && (
          <div className="bg-white p-6 rounded-xl shadow">
            <PlanTable data={allPlans.plans} 
            onPlanUpdated={() => setRefreshPlans(prev => prev + 1)}
            />
          </div>
        )}

        {activeView === "Faq" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <Faq />
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
