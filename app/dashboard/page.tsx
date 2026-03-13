"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import NavbarComponenet from "../../components/NavbarComponenet";
import PaymentSettingCard from "../../components/cards/profile/PaymentSettingCard";
import SubscriptionManagementCard from "./SubscriptionManagementCard";
import Loader from "../../components/Loader";
import { logoutHandler } from "../../utils/auth";
import Myportfolio from "./myportfolio";
import Profile from "./profile";
import Pricing from "../../utils/Plan";
import MessagesPage from "./MessagesPage";

import {
  User,
  Briefcase,
  CreditCard,
  Layers,
  MessageSquare,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { PlanCardInterface } from "@/components/plan/plancard";

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [planInfo, setPlanInfo] = useState<PlanCardInterface>();

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

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#plan") {
      setActiveSection("Pricing");
    }
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}plan/getplanbyuser`,
          { withCredentials: true }
        );
        setPlanInfo(res?.data?.plans[0])
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const sidebarLinks = [
    { label: "Profile", icon: User, key: "Profile" },
    { label: "My Portfolio", icon: Briefcase, key: "myPortfolio" },
    { label: "Subscription", icon: CreditCard, key: "Subscription" },
    { label: "Plans", icon: Layers, key: "Pricing" },
    { label: "Messages", icon: MessageSquare, key: "MessagesPage" },
  ];

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <NavbarComponenet
        text="My Domz"
        IsParaText={false}
        searchbarStatus={false}
      />

      {/* MOBILE HEADER */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <h2 className="font-semibold text-lg">Dashboard</h2>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex flex-1 relative overflow-hidden">

        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`

          fixed sm:static
          z-40
          top-0 left-0
          h-full
          w-64
          bg-white
          border-r
          transform transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}

          `}
        >

          {/* mobile close */}
          <div className="sm:hidden flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Menu</h3>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <nav className="p-4 space-y-2">

            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSection(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`

                  flex items-center gap-3
                  w-full px-3 py-2
                  rounded-lg
                  text-sm font-medium
                  transition

                  ${isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                    }

                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}

            {/* logout */}

            <button
              onClick={() => logoutHandler(router)}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>

          </nav>

        </aside>

        {/* MAIN CONTENT */}

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">

          <div className="max-w-6xl mx-auto cursor-pointer">

            {activeSection === "Profile" && <Profile />}

            {activeSection === "Pricing" && <Pricing planinfo={planInfo} />}

            {activeSection === "Subscription" && (
              <SubscriptionManagementCard />
            )}

            {activeSection === "billing" && <PaymentSettingCard />}

            {activeSection === "MessagesPage" && <MessagesPage />}

            {activeSection === "myPortfolio" && <Myportfolio />}

          </div>

        </main>

      </div>

      <Footer />
    </div>
  );
};

export default Page;