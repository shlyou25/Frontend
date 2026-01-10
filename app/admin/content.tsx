'use client';

import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { logoutHandler } from "@/utils/auth";


export type AdminView = "dashboard" | "Users" | "domains" | "Plans" | "Faq";


interface SidebarProps {
  activeView: AdminView;
  setActiveView: Dispatch<SetStateAction<AdminView>>;
}


interface MenuItem {
  label: string;
  view: AdminView;
  iconBg: string;
  iconColor: string;
  svg: React.ReactNode;
}

interface MenuSection {
  section: string;
  children: MenuItem[];
}

type Menu = (MenuItem | MenuSection)[];

const menu: Menu = [
  {
    label: "Dashboard",
    view: "dashboard",
    iconBg: "bg-[#FEE4E2]",
    iconColor: "text-[#D92D20]",
    svg: (
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 11.5L12 3l9 8.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"
      />
    ),
  },
  {
    section: "Explore",
    children: [
      {
        label: "Users",
        view: "Users",
        iconBg: "bg-[#E6F4FF]",
        iconColor: "text-[#1570EF]",

        svg: (
          <>
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 21a8 8 0 0 0-16 0"
            />
            <circle
              cx="10"
              cy="8"
              r="5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"
            />
          </>
        ),

      },
      {
        label: "Domains",
        view: "domains",
        iconBg: "bg-[#E0EAFF]",
        iconColor: "text-[#2970FF]",
        svg: (
          <path
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2v4m6.364 1.636-2.828 2.828M22 12h-4m-1.636 6.364-2.828-2.828M12 22v-4m-6.364-1.636 2.828-2.828M2 12h4"
          />
        ),
      },
      {
        label: "Plans",
        view: "Plans",
        iconBg: "bg-[#E6F4FF]",
        iconColor: "text-[#1570EF]",
        svg: (
          <path
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 14a4 4 0 1 0-8 0m12 6v-1a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v1"
          />
        ),
      },
      {
        label: "Faq",
        view: "Faq",
        iconBg: "bg-[#F4EBFF]",
        iconColor: "text-[#7F56D9]",
        svg: (
          <>
            <path stroke="currentColor" strokeWidth="1.8" d="M9 3H5v18h4V3Z" />
            <path stroke="currentColor" strokeWidth="1.8" d="M19 3h-4v18h4V3Z" />
          </>
        ),
      },

    ],
  },
];

export default function Content({ activeView, setActiveView }: SidebarProps) {
  const router = useRouter();
  return (
    <div className="h-full px-6 py-6 overflow-y-auto bg-white border-r border-gray-200">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Admin</h1>

      {menu.map((item, index) => (
        <div key={index} className="mb-4">
          {"section" in item && (
            <p className="text-xs uppercase text-gray-400 mb-2">
              {item.section}
            </p>
          )}

          {"children" in item
            ? item.children.map((sub, idx) => (
              <SidebarItem
                key={idx}
                label={sub.label}
                iconBg={sub.iconBg}
                iconColor={sub.iconColor}
                svg={sub.svg}
                active={activeView === sub.view}
                onClick={() => setActiveView(sub.view)}
              />
            ))
            : (
              <SidebarItem
                label={item.label}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
                svg={item.svg}
                active={activeView === item.view}
                onClick={() => setActiveView(item.view)}
              />
            )}
        </div>
      ))}

      <div className="mt-6 border-t pt-4">
        <button
          onClick={() => logoutHandler(router)}
          className="flex items-center gap-3 text-red-500 font-medium hover:bg-red-50 w-full p-2 rounded-lg transition"
        >
          <span className="text-xl">↩</span> Sign Out
        </button>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  label: string;
  iconBg: string;
  iconColor: string;
  svg: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const SidebarItem = ({
  label,
  iconBg,
  iconColor,
  svg,
  active,
  onClick,
}: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition
      ${active ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}
    `}
  >
    <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        {svg}
      </svg>
    </div>
    <span className="text-gray-700">{label}</span>
  </button>
);
