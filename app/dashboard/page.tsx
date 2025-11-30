"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Footer from "@/components/Footer";
import NavbarComponenet from "@/components/NavbarComponenet";
import PaymentSettingCard from "@/components/cards/profile/PaymentSettingCard";
import SubscriptionManagementCard from "@/app/dashboard/SubscriptionManagementCard";
import Loader from "@/components/Loader";
import Profile from "./profile";
import Subscription from "./subscription";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("Profile");
  const [sidebarOpen, setSidebarOpen] = useState(false); // ⭐ mobile toggle

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}auth/authenticate`,
          { withCredentials: true }
        );
        setLoading(false);
      } catch {
        router.push("/signup");
      }
    };
    checkAuth();
  }, [router]);

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_apiLink}auth/logout`,
        { withCredentials: true }
      );

      if (response.status === 200 && response.data.status) {
        toast.success(response.data.message || "Logged Out successfully!");
        router.push("/");
      } else {
        toast.error(response.data.message || "Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const sidebarLinks = [
    { label: "Profile", icon: "/assets/icons/user.webp", onClick: () => setActiveSection("Profile") },
    { label: "Plans", icon: "/assets/icons/padlock.webp", onClick: () => router.push("/plan") },
    { label: "My Portfolio", icon: "/assets/icons/padlock.webp", onClick: () => setActiveSection("myPortfolio") },
    { label: "Subscription", icon: "/assets/icons/credit-card.webp", onClick: () => setActiveSection("Subscription") },
    { label: "Billing", icon: "/assets/icons/bill.webp", onClick: () => setActiveSection("billing") },
    { label: "Logout", icon: "/assets/icons/logout.png", onClick: logoutHandler },
  ];

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white">
      <NavbarComponenet colorText="P" plainText="rofile" IsParaText={false} />

      {/* ⭐ Mobile Menu Toggle */}
      <div className="flex sm:hidden justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <button
          className="text-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Image src="/assets/icons/menu.svg" alt="menu" width={26} height={26} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* ⭐ FIXED SIDEBAR (same position as before, just fixed) */}
        <aside
          className={`
      bg-white border-r border-gray-200 px-4 py-6 
      w-full sm:w-64 shrink-0 
      h-screen fixed left-0 top-[255px]   /* ⭐ 100px = your Navbar height */
      overflow-y-auto z-40
      transition-all duration-300
      ${sidebarOpen ? "block" : "hidden sm:block"}
    `}
        >
          <ul className="space-y-6">
            {sidebarLinks.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    item.onClick();
                    setSidebarOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ⭐ MAIN CONTENT — SAME POSITION AS BEFORE */}
        <main
          className="
      flex-1 
      px-4 sm:px-8 py-8 
      mt-4
      sm:ml-64             /* ⭐ This keeps content exactly where it was */
    "
        >
          {activeSection === "Profile" && <Profile />}
          {activeSection === "Subscription" && <SubscriptionManagementCard />}
          {activeSection === "billing" && <PaymentSettingCard />}
          {activeSection === "myPortfolio" && <Subscription />}
        </main>
      </div>


      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Page;
