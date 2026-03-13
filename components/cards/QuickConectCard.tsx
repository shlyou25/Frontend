"use client";

import { handleAuthRedirect } from "@/utils/checkAuth";
import { useRouter } from "next/navigation";
import React from "react";

interface QuickConnectCardProps {
  title: string;
  description: string;
  mainButton?: string;
  subButton?:boolean
}

const QuickConnectCard: React.FC<QuickConnectCardProps> = ({
  title,
  description,
  mainButton,
}) => {
  const router = useRouter();

  return (
    <section id="quick-connect">
      <div className="mx-auto my-20 max-w-6xl px-4 text-center">
        <div className="rounded-4xl bg-blue-600 px-10 py-20 text-white shadow-2xl">
          
          {/* Title */}
          <h2 className="text-[2.6rem] font-bold mb-4">
            {title}
          </h2>

          {/* Description */}
          <p className="mb-8 text-blue-100">
            {description}
          </p>

          {/* CTA Button */}
          {mainButton && (
            <button
              onClick={() => handleAuthRedirect(router)}
              className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
            >
              {mainButton}
            </button>
          )}

        </div>
      </div>
    </section>
  );
};

export default QuickConnectCard;