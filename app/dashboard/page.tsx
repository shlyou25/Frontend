"use client";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import PaymentSettingCard from '@/components/cards/profile/PaymentSettingCard';
import SubscriptionManagementCard from '@/components/cards/profile/SubscriptionManagementCard';
import Loader from '@/components/Loader';

interface backendUserData{
    'name':string;
    'email':string
}

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [userData,setUserData]=useState<backendUserData>()
  const router = useRouter();

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
        if (isMounted) router.push("/login");
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}user/getuserbyid`,
          { withCredentials: true }
        );
        setUserData(res.data.user) 
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
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
    { label: "Profile", icon: "/assets/icons/user.webp", onClick: () => {} },
    { label: "Security", icon: "/assets/icons/padlock.webp", onClick: () => {} },
    { label: "Subscription", icon: "/assets/icons/credit-card.webp", onClick: () => {} },
    { label: "Billing", icon: "/assets/icons/bill.webp", onClick: () => {} },
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
          <section className="max-w-2xl mx-auto bg-gray-50 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Profile information</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={userData?.name}
                  className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={userData?.email}
                  className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                  readOnly
                />
                <button
                  type="button"
                  className="absolute right-2 top-7 text-xs text-blue-500 hover:underline"
                >
                  Send Verification Link
                </button>
              </div>
              {/* <div className="relative">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value="••••••••"
                  className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                  readOnly
                />
                <button
                  type="button"
                  className="absolute right-2 top-7 text-xs text-blue-500 hover:underline"
                >
                  Send Verification Link
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">2FA/Recovery Option</label>
                <input
                  type="text"
                  value=""
                  placeholder=""
                  className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                  readOnly
                />
                <button
                  type="button"
                  className="absolute right-2 top-7 text-xs text-blue-500 hover:underline"
                >
                  Manage
                </button>
              </div> */}
              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
              >
                Save Changes
              </button>
            </form>
          </section>
          <SubscriptionManagementCard />
          <PaymentSettingCard />
        </main>
      </div>
      <div className="flex justify-end max-w-2xl mx-auto ">
        <button
          type="button"
          className="bg-red-400 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full shadow transition cursor-pointer"
        >
          Delete Account
        </button>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};
export default Page;
