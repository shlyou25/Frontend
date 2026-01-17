"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Plus, Minus } from "lucide-react";
import axios from "axios";

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
                className={`rounded-2xl transition-all duration-300 ${
                  openCategory === category ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center w-full text-left px-6 py-5 gap-4"
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm">
                    {openCategory === category ? (
                      <Minus className="w-5 h-5 text-gray-800" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-800" />
                    )}
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {category}
                  </h3>
                </button>
                {openCategory === category && (
                  <div className="px-6 pb-6 space-y-4">
                    {faqs.map((item) => (
                      <div
                        key={item._id}
                        className="rounded-xl bg-white border transition-all"
                      >
                        <button
                          onClick={() => toggleQuestion(item._id)}
                          className="flex items-center w-full text-left px-6 py-4 gap-4"
                        >
                          <span className="flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full">
                            {openQuestion === item._id ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </span>

                          <h4 className="font-medium text-gray-900">
                            {item.question}
                          </h4>
                        </button>

                        {openQuestion === item._id && (
                          <div className="px-16 pb-4 text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
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
