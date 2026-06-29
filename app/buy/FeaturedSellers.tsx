// 'use client';

// interface FeaturedSeller {
//   userName: string;
// }

// interface FeaturedSellersProps {
//   sellers: FeaturedSeller[];
//   selectedSeller?: string;
//   onSelect: (sellerName: string) => void;
//   onClear?: () => void;
// }

// const PALETTES = [
//   { bg: '#DBEAFE', text: '#1D4ED8' },
//   { bg: '#EDE9FE', text: '#6D28D9' },
//   { bg: '#D1FAE5', text: '#065F46' },
//   { bg: '#FEF3C7', text: '#92400E' },
//   { bg: '#FCE7F3', text: '#9D174D' },
//   { bg: '#E0F2FE', text: '#0369A1' },
// ];

// function getAvatarColor(name: string) {
//   const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
//   return PALETTES[hash % PALETTES.length];
// }

// function getInitials(name: string) {
//   return name
//     .split(' ')
//     .map((w) => w[0])
//     .join('')
//     .slice(0, 2)
//     .toUpperCase();
// }

// export default function FeaturedSellers({
//   sellers,
//   selectedSeller,
//   onSelect,
//   onClear,
// }: FeaturedSellersProps) {
//   if (!sellers.length) return null;

//   return (
//     <aside className="hidden xl:flex flex-col w-56 min-w-56 border-l border-gray-200/70 bg-white">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
//         <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
//           Featured sellers
//         </span>
//         {selectedSeller && (
//           <button
//             onClick={onClear}
//             className="text-xs text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded transition"
//           >
//             Clear
//           </button>
//         )}
//       </div>

//       {/* List */}
//       <div className="flex flex-col gap-0.5 p-2 overflow-y-auto">
//         {sellers.map((seller) => {
//           const color = getAvatarColor(seller.userName);
//           const isActive = selectedSeller === seller.userName;

//           return (
//             <button
//               key={seller.userName}
//               onClick={() => onSelect(seller.userName)}
//               className={`
//                 flex items-center gap-2.5 w-full text-left
//                 px-2.5 py-2 rounded-lg border transition-all duration-150
//                 ${isActive
//                   ? 'bg-blue-50 border-blue-300 text-blue-700'
//                   : 'bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-200 text-gray-700'
//                 }
//               `}
//             >
//               {/* Avatar */}
//               <span
//                 className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
//                 style={{ background: color.bg, color: color.text }}
//               >
//                 {getInitials(seller.userName)}
//               </span>

//               {/* Name */}
//               <span className="flex-1 text-[13px] font-medium truncate leading-tight">
//                 {seller.userName}
//               </span>

//               {/* Active check */}
//               {isActive && (
//                 <svg
//                   className="w-3.5 h-3.5 text-blue-500 flex-shrink-0"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2.5}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                 </svg>
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </aside>
//   );
// }

'use client';

interface FeaturedSeller {
  userName: string;
}

interface FeaturedSellersProps {
  sellers: FeaturedSeller[];
  selectedSeller?: string;
  onSelect: (sellerName: string) => void;
  onClear?: () => void;
}

const PALETTES = [
  { bg: '#DBEAFE', text: '#1D4ED8' },
  { bg: '#EDE9FE', text: '#6D28D9' },
  { bg: '#D1FAE5', text: '#065F46' },
  { bg: '#FEF3C7', text: '#92400E' },
  { bg: '#FCE7F3', text: '#9D174D' },
  { bg: '#E0F2FE', text: '#0369A1' },
];

function getAvatarColor(name: string) {
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PALETTES[hash % PALETTES.length];
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function FeaturedSellers({
  sellers,
  selectedSeller,
  onSelect,
  onClear,
}: FeaturedSellersProps) {
  if (!sellers.length) return null;

  return (
    <aside className="flex flex-col w-56 min-w-56 border-l border-gray-200/70 bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Featured sellers
        </span>
        {selectedSeller && (
          <button
            onClick={onClear}
            className="text-xs text-blue-600 hover:bg-blue-50 px-2 py-0.5 rounded transition"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-0.5 p-2 overflow-y-auto">
        {sellers.map((seller) => {
          const color = getAvatarColor(seller.userName);
          const isActive = selectedSeller === seller.userName;

          return (
            <button
              key={seller.userName}
              onClick={() => onSelect(seller.userName)}
              className={`
                flex items-center gap-2.5 w-full text-left
                px-2.5 py-2 rounded-lg border transition-all duration-150
                ${isActive
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-200 text-gray-700'
                }
              `}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                style={{ background: color.bg, color: color.text }}
              >
                {getInitials(seller.userName)}
              </span>

              <span className="flex-1 text-[13px] font-medium truncate leading-tight">
                {seller.userName}
              </span>

              {isActive && (
                <svg
                  className="w-3.5 h-3.5 text-blue-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}