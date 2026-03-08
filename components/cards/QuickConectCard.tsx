import { handleAuthRedirect } from "@/utils/checkAuth";
import { useRouter } from 'next/navigation'
import React from "react";

interface QuickConectCardInterface {
  title: string;
  description: string;
  mainButton: string;
  subButton: Boolean;
}

const QuickConectCard = (props: QuickConectCardInterface) => {
  const router = useRouter()
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        className="
        relative
        max-w-6xl
        mx-auto
        rounded-4xl
        px-8 py-16 md:px-16
        text-center
        overflow-hidden
        bg-linear-to-br from-blue-600 via-blue-600 to-blue-700
        shadow-[0_30px_80px_rgba(37,99,235,0.45)]
      "
      >
       

        {/* subtle glass */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

        {/* content */}
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* title */}
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
            {props.title}
          </h2>

          {/* description */}
          <p className="text-blue-100 text-lg leading-relaxed mb-10">
            {props.description}
          </p>

          {/* CTA */}
          {props.mainButton && (
            <div >
              <button  onClick={() => handleAuthRedirect(router)}
                className="
                group
                relative
                cursor-pointer
                bg-white
                text-blue-700
                font-semibold
                text-lg
                px-10
                py-4
                rounded-full
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                active:translate-y-0
              "
              >
                {props.mainButton}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickConectCard;