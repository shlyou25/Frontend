




import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Domz.com | Dashboard",
  description:
    "Manage your domain name portfolios in the Domz.com dashboard. Upload listings, review offers, and connect directly with buyers commission-free.",
};

export default function Page() {
  return <DashboardClient />;
}