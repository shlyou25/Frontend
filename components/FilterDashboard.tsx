"use client";
import React, { useState } from "react";

const extensions = [
    ".com", ".org", ".net", ".ai", ".xyz", ".now", ".de",
    ".co", ".io", ".us", ".ca", ".uk", ".au", ".info"
];

const FilterDashboard = () => {
    const [viewDropdown, setViewDropdown] = useState(false);
    const [sortDropdown, setSortDropdown] = useState(false);

    return (
        <div className="flex flex-col items-center min-h-screen bg-white py-12 px-4">
            <div className="flex">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-md mb-6 transition-all">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <circle cx="6" cy="12" r="1.3" /><circle cx="12" cy="12" r="1.3" /><circle cx="18" cy="12" r="1.3" />
                    </svg>
                    Filter
                </button>
            </div>
            {/* Main Filter Card */}
            <div className="relative w-full max-w-3xl bg-linear-to-tr from-blue-100 via-white to-blue-200 rounded-3xl shadow-xl px-10 py-8 mb-14 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                    {/* Extensions Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Extensions</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {extensions.map(ext => (
                                <label key={ext} className="flex items-center space-x-2 text-gray-700 text-base">
                                    <input type="checkbox" className="accent-blue-500 rounded-sm focus:ring focus:ring-blue-200" />
                                    <span>{ext}</span>
                                </label>
                            ))}
                        </div>
                        <a href="#" className="mt-8 inline-block text-blue-500 font-semibold hover:underline px-2 py-1 rounded-lg">Clear Filter</a>
                    </div>

                    {/* Characters Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Characters</h4>
                        <label className="flex items-center mb-2 text-gray-700">
                            <input type="checkbox" className="accent-blue-500" /> <span className="ml-2">Letters</span>
                        </label>
                        <label className="flex items-center mb-2 text-gray-700">
                            <input type="checkbox" className="accent-blue-500" /> <span className="ml-2">Numbers</span>
                        </label>
                        <label className="flex items-center mb-2 text-gray-700">
                            <input type="checkbox" className="accent-blue-500" /> <span className="ml-2">Hyphens</span>
                        </label>
                    </div>

                    {/* Words Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Words</h4>
                        <div>
                            <label className="block text-sm mb-1">Starts with</label>
                            <input type="text" className="w-full rounded-lg border border-gray-300 p-2 mb-2" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Ends with</label>
                            <input type="text" className="w-full rounded-lg border border-gray-300 p-2 mb-2" />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Contains</label>
                            <input type="text" className="w-full rounded-lg border border-gray-300 p-2 mb-2" />
                        </div>
                        <label className="flex items-center mt-2 text-gray-700">
                            <input type="checkbox" className="accent-blue-500" /> <span className="ml-2">Exact</span>
                        </label>
                    </div>

                    {/* Length & Seller Name Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Length</h4>
                        <div className="flex gap-2 mb-4">
                            <input type="number" className="w-1/2 rounded-lg border border-gray-300 p-2" placeholder="Min" />
                            <input type="number" className="w-1/2 rounded-lg border border-gray-300 p-2" placeholder="Max" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">Seller Name</h4>
                        <input type="text" className="w-full rounded-lg border border-gray-300 p-2" placeholder="Enter Name" />
                    </div>
                </div>
                {/* Apply Filter Button */}
                <button className="absolute right-10 bottom-10 bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-2 rounded-full shadow transition-all">
                    Apply Filter
                </button>
            </div>

            {/* Dropdowns Section */}
            <div className="flex flex-row flex-wrap gap-24 justify-center items-start">
                {/* View By Dropdown */}
                <div className="relative flex flex-col items-center">
                    <button
                        className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition"
                        onClick={() => setViewDropdown(!viewDropdown)}
                    >
                        View By
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {viewDropdown && (
                        <div className="absolute top-full mt-2 z-10 w-44 bg-white rounded-2xl shadow-lg p-6 space-y-2 text-gray-700 border border-blue-100">
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">25</span></label>
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">50</span></label>
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">250</span></label>
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">Infinite Scroll</span></label>
                        </div>
                    )}
                </div>

                {/* Sort By Dropdown */}
                <div className="relative flex flex-col items-center">
                    <button
                        className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition"
                        onClick={() => setSortDropdown(!sortDropdown)}
                    >
                        Sort By
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {sortDropdown && (
                        <div className="absolute top-full mt-2 z-10 w-44 bg-white rounded-2xl shadow-lg p-6 space-y-2 text-gray-700 border border-blue-100">
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">A-Z</span></label>
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">Z-A</span></label>
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">L-LL</span></label>
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">Newest</span></label>
                            <label className="flex items-center"><input type="checkbox" /> <span className="ml-2">Oldest</span></label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterDashboard;
