import React from 'react';

interface Feature {
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    title: "About Domz",
    desc: "Domz is a decentralized domain directory designed to facilitate direct connections between buyers and sellers. The platform functions as a discovery layer rather than a transactional intermediary, allowing both parties to maintain full autonomy.",
  },
  {
    title: "Direct Communication",
    desc: "Every listing links to a seller-authorized landing page. A dedicated messaging system enables direct communication between buyers and sellers, ensuring that all negotiation, payment, and transfer terms remain strictly between the two parties.",
  },
  {
    title: "Portfolio Management",
    desc: "Built for high-volume scale, Domz allows sellers to upload portfolios in seconds by entering domain URLs—no DNS configuration or nameserver changes required. The directory synchronizes with the seller’s off-site landing pages, ensuring that updates to pricing or status are reflected automatically.",
  },
  {
    title: "Economic Model",
    desc: "Domz replaces the traditional commission-based structure with a fixed listing fee. By removing the 10–30% success fees typical of major marketplaces, the platform enables sellers to scale their reach while preserving full profit margins.",
  },
];

const DiscoveryPartner: React.FC = () => (
  <main className=" flex items-center justify-center bg-linear-to-b from-blue-100 via-blue-50 to-white px-2 pb-20 rounded-2xl">
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
