import React from 'react'
const DomainTable = () => {
    const Data = [
  { Domain: "Listure.com", Seller: "KellyJoan" },
  { Domain: "EdenBay.com", Seller: "Dom88" },
  { Domain: "PodCity.com", Seller: "PhoenixX" },
  { Domain: "HIIW.com", Seller: "TodSimons" },
  { Domain: "Nishmas.org", Seller: "EchoWolf91" },
  { Domain: "AiSpyz.com", Seller: "SilentRun" },
  { Domain: "OBGYNBlog.com", Seller: "NightHawk" },
  { Domain: "Wahew.com", Seller: "SealUK" },
  { Domain: "Example.com", Seller: "Temple613" },
];
    return (
        <>
            <section className=" sm:p-5">
                <div className=" max-w-7xl px-4 lg:px-12">
                    <div className=" relative  overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 :focus:ring-gray-700">
                                    Filter                                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0">
                                <button className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2">
                                    <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                    </svg>
                                    Add product
                                </button>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 :focus:ring-gray-700">
                                        View By
                                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                    <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                                        <ul className="py-1 text-sm text-gray-700" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100">Mass Edit</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Delete all</a>
                                        </div>
                                    </div>
                                    <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 :focus:ring-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                        </svg>
                                        Sort By
                                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                    <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow">
                                        <h6 className="mb-3 text-sm font-medium text-gray-900">Choose brand</h6>
                                        <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                            <li className="flex items-center">
                                                <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                                                <label className="ml-2 text-sm font-medium text-gray-900 ">Apple (56)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="fitbit" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                                                <label className="ml-2 text-sm font-medium text-gray-900 ">Microsoft (16)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="razor" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                                                <label className="ml-2 text-sm font-medium text-gray-900 ">Razor (49)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="nikon" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                                                <label className="ml-2 text-sm font-medium text-gray-900 ">Nikon (12)</label>
                                            </li>
                                            <li className="flex items-center">
                                                <input id="benq" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500" />
                                                <label className="ml-2 text-sm font-medium text-gray-900 ">BenQ (74)</label>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Domain</th>
                                        <th scope="col" className="px-4 py-3">Connect</th>
                                        <th scope="col" className="px-4 py-3">Seller</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Data?.map((data=>(
                                      <tr className="border-b">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{data.Domain}</th>
                                        <td className="px-4 py-3 cursor-pointer">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    className="w-5 h-5 rotate-300"
                                                    color='gray'
                                                >
                                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                                </svg>
                                        </td>
                                        <td className="px-4 py-3">{data.Seller}</td>
                                    </tr>
                                    )))}
                                   
                                </tbody>
                            </table>
                        </div>
                        {/* pagination */}
                        <div className="row flex justify-center py-4">
                            <div className=" border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <button className="py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                1
                            </button>
                            <button className="py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                2
                            </button>
                            <button className="py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                3
                            </button>
                            <button className="py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                4
                            </button>
                            <button className="py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                5
                            </button>
                            <button className="py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DomainTable