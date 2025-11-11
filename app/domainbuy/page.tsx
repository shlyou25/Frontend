import DomainTable from '@/components/DomainTable'
import FilterDashboard from '@/components/FilterDashboard'
import Footer from '@/components/Footer'
import NavbarComponenet from '@/components/NavbarComponenet'

const page = () => {
    return (
        <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
            <NavbarComponenet colorText="Your Do" plainText="main Search Starts at Domz" IsParaText={true} ParaText="Browse a commission-free catalog and connect directly with domain owners." />
            <DomainTable />
            <div className="w-full px-2 py-12 bg-blue-50 flex flex-col items-center rounded-3xl">
                <h2 className="text-2xl md:text-3xl font-light text-center mb-2 mt-2">
                    <span className="text-blue-600 font-semibold">How </span>
                    <span className="font-semibold">Domz.com</span>
                    <span className="font-normal"> Benefits Both Sellers and Buyers</span>
                </h2>
                <p className="text-base text-gray-600 text-center max-w-2xl mb-8">
                    Our domain catalog is designed to remove the friction of traditional marketplaces that frustrates both sides. Here’s how it benefits everyone involved:
                </p>
                <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 justify-center mb-12">
                    <div className="flex-1 bg-white shadow rounded-xl p-6 border">
                        <h3 className="text-blue-700 font-bold text-lg mb-3">For Sellers</h3>
                        <ul className="space-y-3 text-gray-700 text-sm">
                            <li>
                                <span className="font-bold">Use your own landing pages</span>
                                <div>Link directly to existing marketplace landers, a brokerage site, or any landing page you choose.</div>
                            </li>
                            <li>
                                <span className="font-bold">Keep 100% of your earnings</span>
                                <div>We don’t take a cut. You keep the full sale price—no commissions or hidden fees.</div>
                            </li>
                            <li>
                                <span className="font-bold">Set your own terms</span>
                                <div>You define the price, negotiation style, and how the deal closes. We don’t interfere.</div>
                            </li>
                            <li>
                                <span className="font-bold">Stay independent</span>
                                <div>No listing fees, no lock-ins, and no exclusivity requirements.</div>
                            </li>
                            <li>
                                <span className="font-bold">Get discovered without middlemen</span>
                                <div>Increase exposure without relying on a pre-determined algorithm to prioritize your listings.</div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-white shadow rounded-xl p-6 border">
                        <h3 className="text-blue-700 font-bold text-lg mb-3">For Buyers</h3>
                        <ul className="space-y-3 text-gray-700 text-sm">
                            <li>
                                <span className="font-bold">Talk directly to domain owners</span>
                                <div>Skip the brokers and third-party forms—your inquiries go straight to the source.</div>
                            </li>
                            <li>
                                <span className="font-bold">Browse with no barriers</span>
                                <div>No sign-ups or accounts are needed to explore listings. Enroll to optimize your history.</div>
                            </li>
                            <li>
                                <span className="font-bold">See real pricing and real offers</span>
                                <div>Listings reflect seller-defined prices, not inflated platform markups.</div>
                            </li>
                            <li>
                                <span className="font-bold">Faster deals, fewer delays</span>
                                <div>Peer-to-peer conversations mean you can move at your pace, not someone else’s.</div>
                            </li>
                            <li>
                                <span className="font-bold">Access exclusive inventory</span>
                                <div>Find domains that aren’t listed on marketplaces—or buried by algorithms.</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full max-w-5xl rounded-2xl px-4 py-8 mt-6 bg-blue-100">
                    <h3 className="text-2xl font-semibold mb-3">
                        <span className="bg-linear-to-r from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent font-bold">
                            Designed
                        </span>
                        {' '}for the Way Deals Happen Today
                    </h3>
                    <p className="text-black  mb-2">
                        The domain industry is evolving. Buyers are more discerning, sellers are more strategic, and successful transactions often happen through direct, high-trust interactions. In this environment, efficiency, flexibility, and control are essential.
                    </p>
                    <p className="text-black mb-2">
                        Our catalog is built to reflect the way experienced professionals operate today. No outdated processes, no unnecessary layers—just clean, direct exposure that supports meaningful connections and smooth deal flow.
                    </p>
                    <p className="text-black">
                        It’s a modern solution for a modern market—designed to help you move quickly, stay in control, and close with confidence.
                    </p>
                </div>
            </div>
            <Footer/>
            {/* <FilterDashboard/> */}
        </div>
    )
}

export default page