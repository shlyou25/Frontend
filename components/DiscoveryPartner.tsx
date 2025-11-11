import React from 'react';

interface Feature {
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    title: "Discovery, Not Owned",
    desc: "This isn’t a marketplace — rather, an open, neutral catalog where you list your domains, link to your own landing pages, and connect directly with buyers. We exist to help make those connections easier, not to get in the way.",
  },
  {
    title: "Control, Not Interference",
    desc: "Whether you’re selling, brokering, or promoting, you stay in full control. Your names, your negotiations, your terms — always. No middlemen, and no third-party communication breakdowns.",
  },
  {
    title: "Direct, Not Filtered",
    desc: "Built on principles of openness and ownership, Domz.com removes gatekeeping — giving buyers direct, transparent access to sellers. Anyone can browse, and every inquiry goes straight to the source.",
  },
  {
    title: "Profit, Not Payouts",
    desc: "This is domain discovery reimagined: open, transparent, and peer-to-peer. You own the domain, and you own the deal. Real pricing, no lock-ins, and absolutely zero commissions.",
  },
];

const DiscoveryPartner: React.FC = () => (
  <main className=" flex items-center justify-center bg-linear-to-b from-blue-100 via-blue-50 to-white px-2 pb-20">
    <div className="max-w-7xl w-full mx-auto py-12 px-6 rounded-3xl bg-transparent">
      <h1 className="text-3xl md:text-5xl font-normal mb-4 text-gray-900">
        We’re not just another domain platform.
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        <span className="text-blue-600">We are</span>
        <span className="ml-2 text-gray-900">your discovery partner.</span>
      </h2>
      <p className="mb-8 text-lg text-gray-700">Here is how we built a better way forward:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-2xl px-7 py-6 shadow border border-blue-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
            <p className="text-base text-gray-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default DiscoveryPartner;
