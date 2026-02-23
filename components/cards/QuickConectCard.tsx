import Link from "next/link";
import React from "react";

interface QuickConectCardInterface {
  title: string;
  description: string;
  mainButton: string;
  subButton: Boolean;
}

const QuickConectCard = (props: QuickConectCardInterface) => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-50 -translate-x-1/2 w-225 h-225 bg-blue-300/30 blur-[140px] rounded-full" />
      </div>
      <div
        className="
          relative
          w-full
          max-w-6xl
          mx-auto
          rounded-[28px]
          p-10 md:p-14
          text-center
          overflow-hidden
          bg-linear-to-br from-blue-600 via-blue-600 to-blue-700
          shadow-[0_20px_60px_rgba(37,99,235,0.35)]
        "
      >
        {/* subtle inner glass */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

        {/* content wrapper */}
        <div className="relative z-10">
          {/* title */}
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            {props?.title}
          </h2>

          {/* description */}
          <p className="text-blue-100 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            {props?.description}
          </p>

          {/* main button */}
          {props?.mainButton && (
            <Link href="/plan">
              <button
                className="
                  group
                  relative
                  bg-white
                  text-blue-700
                  font-semibold
                  px-8 py-3.5
                  rounded-full
                  shadow-lg
                  hover:shadow-xl
                  hover:-translate-y-0.5
                  active:translate-y-0
                  transition-all
                  duration-200
                "
              >
                {props.mainButton}
              </button>
            </Link>
          )}

          {/* feature pills */}
          {props?.subButton && (
            <div className="flex justify-center items-center gap-6 md:gap-10 mt-12 flex-wrap">
              {[
                {
                  icon: "/assets/icons/freetrail.webp",
                  label: "Free Trial",
                },
                {
                  icon: "/assets/icons/cancel.webp",
                  label: "Cancel Anytime",
                },
                {
                  icon: "/assets/icons/user.webp",
                  label: "Brokers Account",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="
                    flex items-center gap-3
                    text-white/90
                  "
                >
                  <span
                    className="
                      inline-flex justify-center items-center
                      w-10 h-10
                      rounded-full
                      bg-white/90
                      backdrop-blur
                      shadow-sm
                    "
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5"
                    />
                  </span>

                  <span className="text-sm md:text-base font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickConectCard;