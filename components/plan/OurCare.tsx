import React from 'react'

const OurCare = () => {
    return (
        <div className="bg-blue-50 rounded-xl p-8 w-full mx-auto shadow">
            <h2 className="text-3xl font-bold leading-[1.15] mb-3">
                <span className="text-blue-700">How Domz</span> <span className="text-black">Caters to Domainers and Brokers</span>
            </h2>
            <p className="text-gray-700 mb-8">
                Our subscription plans are designed for private sellers and professional brokers, with modifications tailored to each one. Here's how it works:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-blue-700 font-bold text-lg mb-2">Private Accounts</h3>
                    <hr className="border-t border-gray-300 mb-4" />
                    <ul className="list-disc ml-5 text-gray-700 space-y-2">
                        <li>Each listing must link directly to its own landing page; portfolio or external site links are not permitted.</li>
                        <li>Private account holders may use their real name as a username or choose an alias to display publicly.</li>
                        <li>In limited cases, Domz may allow a portfolio to link instead of an individual landing page.</li>
                    </ul>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-blue-700 font-bold text-lg mb-2">Broker Accounts</h3>
                    <hr className="border-t border-gray-300 mb-4" />
                    <ul className="list-disc ml-5 text-gray-700 space-y-2">
                        <li>Listings in the Broker section may link to the brokerage's main site or a relevant page within it.</li>
                        <li>A broker's username must match the brokerage's name or the broker's real name; aliases are not allowed.</li>
                        <li>Brokerages must have been in operation for at least one year and be in good standing within the domain community.</li>
                    </ul>
                </div>
            </div>
            {/* <h2 className="text-3xl font-bold leading-[1.15] mb-3">
                <span className="text-blue-700">The Platform</span> <span className="text-black">Designed for Your Bottom Line</span>
            </h2> */}
            {/* <p className="text-gray-700">
                Built to help you sell more and keep more, Domz puts profit back in your pocket. Most marketplaces take a commission on every sale—so the more you earn, the more you lose. Domz takes a different approach. We use a simple, fixed subscription fee, so you keep 100% of every deal. No percentage cuts. No hidden charges. Just predictable costs and maximum return.
            </p> */}
        </div>
    )
}

export default OurCare