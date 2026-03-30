import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import '../node_modules/react-toastify/dist/ReactToastify.css'
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.domz.com"),

  title: {
    default: "Domz.com | Domain Name Marketplace",
    template: "%s | Domz.com",
  },

  description:
    "Domz.com is a curated domain marketplace where trusted investors list domain name portfolios. Discover great names, connect directly with sellers, and close deals commission-free.",

  applicationName: "Domz.com",

  openGraph: {
    title: "Domz.com | Domain Name Marketplace",
    description:
      "Discover great domain names, connect directly with sellers, and close deals commission-free.",
    url: "https://www.domz.com",
    siteName: "Domz.com",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Domz.com | Domain Name Marketplace",
    description:
      "Discover premium domains and connect directly with sellers commission-free.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NotificationProvider>
        <body className={inter.variable}>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </body>
      </NotificationProvider>
    </html>
  );
}
