import React from "react";
import { logoutHandler } from "@/utils/auth";
import { useRouter } from "next/navigation";



const menu = [
  {
    label: "Dashboard",
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
        label: "Ideas",
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
        label: "Improvements",
        iconBg: "bg-[#FEF0C7]",
        iconColor: "text-[#DC6803]",
        svg: (
          <path
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v18m9-9H3"
          />
        ),
      },
      {
        label: "People",
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
        label: "Leaderboard",
        iconBg: "bg-[#F4EBFF]",
        iconColor: "text-[#7F56D9]",
        svg: (
          <>
            <path
              stroke="currentColor"
              strokeWidth="1.8"
              d="M9 3H5v18h4V3Zm10 0h-4v18h4V3Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="1.8"
              d="M14 8h-4v13h4V8Z"
            />
          </>
        ),
      },
      {
        label: "Component",
        iconBg: "bg-[#FFF1F3]",
        iconColor: "text-[#E31B54]",
        svg: (
          <path
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7h16M4 12h16M4 17h16"
          />
        ),
      },
    ],
  },
  {
    label: "Workshop",
    iconBg: "bg-[#E5F7EF]",
    iconColor: "text-[#12A870]",
    svg: (
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 20v-6l8-4 8 4v6M4 4l8 4 8-4"
      />
    ),
  },
  {
    label: "Settings",
    iconBg: "bg-[#F2F4F7]",
    iconColor: "text-[#475467]",
    svg: (
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5-3a1 1 0 0 0 .87-1.5l-1.12-1.94a1 1 0 0 0-.76-.5l-2.22-.18a1 1 0 0 1-.84-.63l-.83-2.1a1 1 0 0 0-1.6-.45l-1.7 1.42a1 1 0 0 1-1.22 0L7.9 4.7a1 1 0 0 0-1.6.46l-.83 2.1a1 1 0 0 1-.84.63l-2.22.18a1 1 0 0 0-.76.5L.55 10.5A1 1 0 0 0 1.42 12l1.94 1.12c.33.19.57.49.67.86l.18 2.22a1 1 0 0 0 .76.9l2.1.83a1 1 0 0 1 .63.84l.18 2.22a1 1 0 0 0 .5.76l1.94 1.12a1 1 0 0 0 1.5-.87l-.18-2.22c-.06-.37.04-.74.27-1.04l1.35-1.79c.28-.37.46-.82.51-1.29l.12-.83"
      />
    ),
  },
  {
    label: "Administration",
    iconBg: "bg-[#E8EFFD]",
    iconColor: "text-[#3366FF]",
    svg: (
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    ),
  },
];

export default function Content() {
  const router = useRouter();
  return (
    <div className="h-full px-6 py-6 overflow-y-auto bg-white border-r border-gray-200">
      {/* LOGO */}
      <h1 className="text-xl font-bold text-gray-800 mb-6">Admin</h1>

      {/* MENU */}
      {menu.map((item, index) => (
        <div key={index} className="mb-4">
          {item.section && (
            <p className="text-xs uppercase text-gray-400 mb-2">{item.section}</p>
          )}
          {item.children ? (
            item.children.map((sub, idx) => (
              <SidebarItem key={idx} {...sub} />
            ))
          ) : (
            <SidebarItem {...item} />
          )}
        </div>
      ))}

      {/* SIGN OUT */}
      <div className="mt-6 border-t pt-4">
        <button onClick={() => logoutHandler(router)} className="flex items-center gap-3 text-red-500 font-medium hover:bg-red-50 w-full p-2 rounded-lg transition">
          <span className="text-xl">↩</span> Sign Out
        </button>
      </div>
    </div>
  );
}

/* INDIVIDUAL ITEM */
const SidebarItem = ({ label, iconBg, iconColor, svg }: any) => (
  <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
    <div
      className={`w-9 h-9 flex items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        {svg}
      </svg>
    </div>
    <span className="text-gray-700 font-medium">{label}</span>
  </button>
);
