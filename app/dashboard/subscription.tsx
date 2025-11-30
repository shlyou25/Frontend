"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Portfolio from "./portfolio";
import AddDomainsCard from "./adddomain";

const Subscription = () => {
    const [activeTab, setActiveTab] = useState<"account" | "add" | "portfolio">("add");
    const [portfolioStatus, setPortfolioStatus] = useState(false);

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#F5F5F5] border border-gray-200 rounded-lg p-10">
            <div className="flex border-b border-gray-300 mb-10">
                <button
                    onClick={() => setActiveTab("account")}
                    className={`flex-1 py-4 text-center font-medium border-r border-gray-300 cursor-pointer
            ${activeTab === "account" ? "bg-white text-black -mb-px" : "bg-gray-200 text-gray-500"}`}
                >
                    Account Manager
                </button>
                <button
                    onClick={() => setActiveTab("add")}
                    className={`flex-1 py-4 text-center font-semibold border-r border-gray-300 cursor-pointer
            ${activeTab === "add" ? "bg-white text-black -mb-px" : "bg-gray-200 text-gray-500"}`}
                >
                    Add Domains
                </button>
                <button
                    onClick={() => setActiveTab("portfolio")}
                    className={`flex-1 py-4 text-center font-medium cursor-pointer
            ${activeTab === "portfolio" ? "bg-white text-black -mb-px" : "bg-gray-200 text-gray-500"}`}
                >
                    My Portfolio
                </button>
            </div>
            {activeTab === "add" && (
                <AddDomainsCard />
            )}
            {activeTab === 'portfolio' && (<Portfolio portfolioStatus={portfolioStatus} />
            )}
            <ToastContainer />
        </div>
    );
}

export default Subscription