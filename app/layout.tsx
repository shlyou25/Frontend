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
  title: "Domz",
  description: "Domz.com is a curated domain marketplace where trusted investors list domain name portfolios. Discover great names, connect directly with sellers, and close deals commission-free.",
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
