"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Plus, Minus, ChevronDown } from "lucide-react";


type FaqCategory = "Sell" | "Buy" | "Plans" | "Security";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  priorityNumber: number;
  category: FaqCategory;
}

const Faq = () => {
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [openCategory, setOpenCategory] = useState<FaqCategory | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}faq/`
        );

        const sortedFaqs = res.data.faqs.sort(
          (a: FaqItem, b: FaqItem) => a.priorityNumber - b.priorityNumber
        );

        setFaq(sortedFaqs);
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      }
    };

    fetchFaq();
  }, []);
  const groupedFaqs = useMemo(() => {
    return faq.reduce<Record<FaqCategory, FaqItem[]>>(
      (acc, item) => {
        acc[item.category].push(item);
        return acc;
      },
      {
        Sell: [],
        Buy: [],
        Plans: [],
        Security: [],
      }
    );
  }, [faq]);
  const toggleCategory = (category: FaqCategory) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };
  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };
  return (
    <section id="faq" className="bg-white py-20 ">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-900 mb-14">
          Got Questions? We’ve Got Answers.
        </h2>

        <div className="space-y-6">
          {(Object.keys(groupedFaqs) as FaqCategory[]).map((category) => {
            const faqs = groupedFaqs[category];
            if (!faqs.length) return null;

            return (
              <div
                key={category}
                className={`rounded-2xl transition-all duration-300 ${openCategory === category ? "bg-blue-50" : "bg-gray-50"
                  }`}
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center w-full text-left px-6 py-5 gap-4"
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
                    {openCategory === category ? (
                      <Minus className="w-5 h-5 text-gray-800 cursor-pointer" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-800 cursor-pointer" />
                    )}
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {category}
                  </h3>
                </button>
                {openCategory === category && (
                  <div className="px-6 pb-6 space-y-4">
                    {faqs.map((item) => {
                      const isOpen = openQuestion === item._id;

                      return (
                        <div
                          key={item._id}
                          className="rounded-xl bg-white border border-gray-200 overflow-hidden transition"
                        >
                          <button
                            onClick={() => toggleQuestion(item._id)}
                            className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition cursor-pointer"
                          >
                            <h4 className="font-medium text-gray-900">
                              {item.question}
                            </h4>

                            <ChevronDown
                              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                }`}
                            />
                          </button>
                          <div
                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                              }`}
                          >
                            <div className="overflow-hidden">
                              <div className="px-6 pb-5 ml-2">
                                <div className="border-l-4 border-blue-500 pl-4 text-gray-600 leading-relaxed inline-block">
                                  {item.answer}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                )}
              </div>
            );

          })}

        </div>
      </div>
    </section>
  );
};

export default Faq;
