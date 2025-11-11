"use client";
import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import PaymentSettingCard from '@/components/cards/profile/PaymentSettingCard';
import SubscriptionManagementCard from '@/components/cards/profile/SubscriptionManagementCard';
const sidebarLinks = [
    { label: "Profile", icon: "👤" },
    { label: "Security", icon: "🔒" },
    { label: "Subscription", icon: "💳" },
    { label: "Billing", icon: "🧾" },
];

const page = () => {
    return (
        <div className="min-h-screen bg-white lg:pl-[10%] lg:pr-[10%] lg:pt-9">
            <NavbarComponenet colorText="P" plainText="rofile" IsParaText={false} />
            <div className="min-h-screen flex flex-col sm:flex-row bg-white">
                {/* Sidebar */}
                <aside className="sm:w-64 w-full bg-white border-r border-gray-200 px-4 py-8 shrink-0  fixed  left-0 ">
                    <ul className="space-y-6">
                        {sidebarLinks.map((item) => (
                            <li key={item.label}>
                                <button className="flex items-center space-x-3 text-gray-900 hover:text-blue-600 focus:outline-none font-medium">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="hidden sm:inline text-base">{item.label}</span>
                                    <span className="sm:hidden text-sm">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 px-4 py-8">
                    <section className="max-w-2xl mx-auto bg-gray-50 rounded-lg shadow p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">Profile information</h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input
                                    type="text"
                                    value="johndoe"
                                    className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                                    readOnly
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value="johndoe@example.com"
                                    className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-7 text-xs text-blue-500 hover:underline"
                                >
                                    Send Verification Link
                                </button>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    value="••••••••"
                                    className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-7 text-xs text-blue-500 hover:underline"
                                >
                                    Send Verification Link
                                </button>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">2FA/Recovery Option</label>
                                <input
                                    type="text"
                                    value=""
                                    placeholder=""
                                    className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-7 text-xs text-blue-500 hover:underline"
                                >
                                    Manage
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
                            >
                                Save Changes
                            </button>
                        </form>
                    </section>
                    <SubscriptionManagementCard />
                    <PaymentSettingCard />
                </main>
            </div>
            <div className=" flex justify-end max-w-2xl mx-auto ">
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full shadow transition cursor-pointer"
                >
                    Delete Account
                </button>
            </div>
        <Footer/>
        </div>
    );
}

export default page