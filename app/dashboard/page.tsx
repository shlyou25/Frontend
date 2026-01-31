"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "../../components/Footer";
import NavbarComponenet from "../../components/NavbarComponenet";
import PaymentSettingCard from "../../components/cards/profile/PaymentSettingCard";
import SubscriptionManagementCard from "./SubscriptionManagementCard";
import Loader from "../../components/Loader";
import { logoutHandler } from "../../utils/auth";
import Myportfolio from "./myportfolio";
import Profile from "./profile";
import Pricing from "../../utils/Test";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const sidebarLinks = [
    { label: "Profile", icon: "/assets/icons/user.webp", onClick: () => setActiveSection("Profile") },
    { label: "My Portfolio", icon: "/assets/icons/padlock.webp", onClick: () => setActiveSection("myPortfolio") },
    { label: "Subscription", icon: "/assets/icons/credit-card.webp", onClick: () => setActiveSection("Subscription") },
    { label: "Plans", icon: "/assets/icons/padlock.webp", onClick: () => setActiveSection("Pricing") },
    { label: "Logout", icon: "/assets/icons/logout.png", onClick: () => logoutHandler(router) },
  ];
  if (loading) return <Loader />;
  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <NavbarComponenet colorText="P" plainText="rofile" IsParaText={false} searchbarStatus={activeSection === "myPortfolio"}
      onSearch={setSearchQuery}
      />
      <div className="flex sm:hidden justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <button
          className="text-gray-700"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Image src="/assets/icons/menu.svg" alt="menu" width={26} height={26} />
        </button>
      </div>

      <div className="relative flex flex-1">
        <aside
          className={`
    fixed sm:sticky
    top-0 sm:top-22
    left-0
    h-screen sm:h-[calc(100vh-88px)]
    w-64
    bg-white
    border-r border-gray-200
    z-40
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
  `}
        >
          <ul className="space-y-6 px-4 py-6">
            {sidebarLinks.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    item.onClick();
                    setSidebarOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
                >
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-30 sm:hidden"
          />
        )}
        <main className="flex-1 px-4 sm:px-8 py-6 mt-2 sm:mt-0">
          {activeSection === "Profile" && <Profile />}
          {activeSection === "Pricing" && <Pricing />}
          {activeSection === "Subscription" && <SubscriptionManagementCard />}
          {activeSection === "billing" && <PaymentSettingCard />}
          {activeSection === "myPortfolio" && <Myportfolio searchQuery={searchQuery} />}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
