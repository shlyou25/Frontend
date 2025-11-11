
"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I list my domains?",
    answer:
      "Sellers can effortlessly link their domain landing pages by simply entering the URL—no DNS changes required. Entire portfolios can be uploaded in seconds! Once listed, the directory automatically reflects updates made on the hosting site of the landing page, eliminating the need for manual adjustments. By directing potential buyers to your chosen landing pages, you can monitor visits and offers yourself, gaining valuable insights into buyer engagement stats.",
  },
  {
    question: "WordPress Hosting",
    answer:
      "Our WordPress hosting provides secure, scalable, and high-performance environments optimized for content-heavy websites.",
  },
  {
    question: "E-Commerce Hosting",
    answer:
      "Sell online confidently with powerful servers, fast checkout experiences, and built-in SSL protection.",
  },
  {
    question: "Cloud Hosting with Global CDN",
    answer:
      "Experience lightning-fast load times with a global CDN network and auto-scaling capabilities.",
  },
  {
    question: "Custom VPS & Dedicated Servers",
    answer:
      "Get dedicated resources and total control of your environment — ideal for power users and growing businesses.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-14">
          Got Questions? We’ve Got Answers.
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 ${
                openIndex === index ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center w-full text-left px-6 py-5 gap-4 cursor-pointer"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-800" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-800" />
                  )}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {faq.question}
                </h3>
              </button>

              {openIndex === index && (
                <div className="px-16 pb-6 -mt-2 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
