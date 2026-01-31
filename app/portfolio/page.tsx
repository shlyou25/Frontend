'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import QuickConectCard from '../../components/cards/QuickConectCard';
import Footer from '../../components/Footer';
import NavbarComponenet from '../../components/NavbarComponenet';
import Loader from '../../components/Loader';

const Portfolio = () => {
    const [loading, setLoading] = useState(true);
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
      } catch (err) {
        if (isMounted) router.push("/signup");
      }
    };
    checkAuth();
    return () => {
      isMounted = false; // clean up flag
    };
  }, [router]);

    if (loading) return <Loader />;
    return (
        <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
            <NavbarComponenet colorText="MY " plainText="Portfolio" IsParaText={true} ParaText="Browse a commission-free catalog and connect directly with domain owners."
             />
            <div className="w-full max-w-5xl mx-auto mt-8">
                <div className="flex justify-between mb-2">
                    <button className="rounded-full border border-gray-300 px-4 py-1 bg-white text-gray-700 shadow hover:bg-gray-100">
                        Bulk Changes <span>▼</span>
                    </button>
                    <button className="rounded-full border border-gray-300 px-4 py-1 bg-white text-gray-700 shadow hover:bg-gray-100">
                        Sort By <span>▼</span>
                    </button>
                </div>
                <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr className="bg-gray-100 rounded-md">
                            <th className="px-4 py-2 font-medium text-gray-700 text-left rounded-l-md"></th>
                            <th className="px-4 py-2 font-medium text-gray-700 text-left">Domain Name</th>
                            <th className="px-4 py-2 font-medium text-gray-700 text-center">Hide</th>
                            <th className="px-4 py-2 font-medium text-gray-700 text-center">Delete</th>
                            <th className="px-4 py-2 font-medium text-gray-700 text-center">Chat</th>
                            <th className="px-4 py-2 font-medium text-gray-700 text-center">Username</th>
                            <th className="px-4 py-2 font-medium text-gray-700 text-center rounded-r-md">Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example Row */}
                        <tr className="even:bg-blue-50 odd:bg-white">
                            <td className="px-4 py-2">
                                <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-2 text-blue-600 underline cursor-pointer">Listure.com</td>
                            <td className="px-4 py-2 text-center">
                                <input type="checkbox" className="accent-blue-500 rounded" />
                            </td>
                            <td className="px-4 py-2 text-center">
                                <input type="checkbox" className="accent-blue-500 rounded" />
                            </td>
                            <td className="px-4 py-2 text-center">
                                <input type="checkbox" className="accent-blue-500 rounded" />
                            </td>
                            <td className="px-4 py-2 text-center">
                                <input type="checkbox" className="accent-blue-500 rounded" />
                            </td>
                            <td className="px-4 py-2 text-center">18</td>
                        </tr>
                        <tr className="even:bg-blue-50 odd:bg-white">
                            <td className="px-4 py-2">
                                <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-2 text-blue-600 underline cursor-pointer">EdenBay.com</td>
                            <td className="px-4 py-2 text-center">
                                <button className="w-5 h-5 rounded bg-gray-100 text-gray-500 font-bold text-xs">×</button>
                            </td>
                            {/* ...repeat for remaining columns */}
                            <td className="px-4 py-2 text-center">5</td>
                        </tr>
                        {/* Render remaining rows similarly */}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    <button className="mx-1 px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50">&lt;</button>
                    <button className="mx-1 px-2 py-1 rounded bg-blue-600 text-white">1</button>
                    <button className="mx-1 px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50">2</button>
                    <button className="mx-1 px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50">3</button>
                    <button className="mx-1 px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50">4</button>
                    <span className="mx-1 px-2 py-1 text-gray-400">...</span>
                    <button className="mx-1 px-2 py-1 rounded bg-white border border-gray-200 hover:bg-gray-50">&gt;</button>
                </div>
            </div>

            <QuickConectCard
                title="Stay Updated"
                description="Get news, announcements, and highlighted names when our newsletter launches"
                mainButton="Subscribe Now"
                subButton={false}
            />
            <Footer />
        </div>
    );
};

export default Portfolio;


