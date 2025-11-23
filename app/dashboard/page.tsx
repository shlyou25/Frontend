"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import PaymentSettingCard from '@/components/cards/profile/PaymentSettingCard';
import SubscriptionManagementCard from '@/app/dashboard/SubscriptionManagementCard';
import Loader from '@/components/Loader';
import Profile from './profile';


const Page = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Profile");
  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}auth/authenticate`,
          { withCredentials: true }
        );
        if (isMounted) setLoading(false);
      } catch {
        if (isMounted) router.push("/signup");
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);


  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_apiLink}auth/logout`, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.status) {
        toast.success(response?.data?.message || 'Logged Out successful!');
        router.push('/')
      } else {
        toast.error(response?.data?.message || "Logout failed")
      }
    } catch {
      toast.error("Logout failed")
    }
  };
  const sidebarLinks = [
    { label: "Profile", icon: "/assets/icons/user.webp", onClick: () => { setActiveSection('Profile')}},
    { label: "Plans", icon: "/assets/icons/padlock.webp", onClick: () => {router.push('/plan') } },
    { label: "Subscription", icon: "/assets/icons/credit-card.webp", onClick: () => { setActiveSection('Subscription')} },
    { label: "Billing", icon: "/assets/icons/bill.webp", onClick: () => {setActiveSection('billing') } },
    { label: "Logout", icon: "/assets/icons/logout.png", onClick: logoutHandler }
  ];

  if (loading) return <Loader />;
  return (
    <div className="min-h-screen bg-white lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <NavbarComponenet colorText="P" plainText="rofile" IsParaText={false} />
      <div className="min-h-screen flex flex-col sm:flex-row bg-white">
        <aside className="sm:w-64 w-full bg-white border-r border-gray-200 px-4 py-8 shrink-0 fixed left-0 ">
          <ul className="space-y-6">
            {sidebarLinks.map((item) => (
              <li key={item.label}>
                <button className="flex items-center space-x-3 text-gray-900 hover:text-blue-600 focus:outline-none font-medium cursor-pointer"
                  onClick={item.onClick}>
                  <Image src={item.icon} alt={item.label} className="text-2xl" width={20} height={20} />
                  <span className="hidden sm:inline text-base">{item.label}</span>
                  <span className="sm:hidden text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 px-4 py-8">
          {activeSection==='Profile' && <Profile/>}
          {activeSection==='Subscription' && <SubscriptionManagementCard/>}
          {activeSection==='billing' && <PaymentSettingCard/>}
        </main>
      </div>
      {/* <div className="flex justify-end max-w-2xl mx-auto ">
        <button
          type="button"
          className="bg-red-400 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full shadow transition cursor-pointer"
        >
          Delete Account
        </button>
      </div> */}
      <Footer />
      <ToastContainer />
    </div>
  );
};
export default Page;
