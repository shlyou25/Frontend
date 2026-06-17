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

function getInitials(name: string) {
  return name
    .split(/[\s_\-\.]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// Deterministic pastel-blue palette based on name hash
function getAvatarColor(name: string): { bg: string; text: string } {
  const palettes = [
    { bg: '#DBEAFE', text: '#1D4ED8' }, // blue-100 / blue-700
    { bg: '#EDE9FE', text: '#6D28D9' }, // violet-100 / violet-700
    { bg: '#D1FAE5', text: '#065F46' }, // emerald-100 / emerald-800
    { bg: '#FEF3C7', text: '#92400E' }, // amber-100 / amber-800
    { bg: '#FCE7F3', text: '#9D174D' }, // pink-100 / pink-800
    { bg: '#E0F2FE', text: '#0369A1' }, // sky-100 / sky-700
  ];
  const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}

export default function FeaturedSellers({
  sellers,
  selectedSeller,
  onSelect,
  onClear,
}: FeaturedSellersProps) {
  if (!sellers.length) return null;

  return (
    <aside className="hidden xl:block w-72 min-w-72 border-l border-gray-200 bg-white">
      <div className="sticky top-0 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            Featured Sellers
          </h3>

          {selectedSeller && (
            <button
              onClick={onClear}
              className="text-xs text-blue-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-2">
          {sellers.map((seller) => (
            <button
              key={seller.userName}
              onClick={() => onSelect(seller.userName)}
              className={`
                w-full text-left
                p-3 rounded-xl
                border transition-all
                ${
                  selectedSeller === seller.userName
                    ? "bg-blue-50 border-blue-500"
                    : "bg-white border-gray-200 hover:border-blue-300"
                }
              `}
            >
              <div className="font-medium text-sm">
                {seller.userName}
              </div>

             
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}