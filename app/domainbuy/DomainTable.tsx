'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Send, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import Modal from '../../components/model';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { checkAuth } from '@/utils/checkAuth';
import DomainReplyEmail from "./DomainReplyEmail";
import FilterDomain, { DomainFilters } from '../../components/FilterDashboard';

interface Domain {
  domainId: string;
  finalUrl: string;
  domain: string;
  isChatActive: boolean;
  createdAt: string;
  user: {
    id?: string;
    userName?: string;
  };
}

interface Props {
  searchQuery: string;
}
type SortOption = | 'az' | 'za' | 'length_asc' | 'length_desc' | 'newest' | 'oldest';

const DEFAULT_FILTERS: DomainFilters = {
  extensions: [],
};

const DomainTable = ({ searchQuery }: Props) => {
  const [showFilter, setShowFilter] = useState(true);
  const [open, setOpen] = useState(false);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [filters, setFilters] = useState<DomainFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState(0);
  const [authPopupOpen, setAuthPopupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(total / limit);
  const hasActiveFilters =
    filters.extensions.length ||
    filters.startsWith ||
    filters.endsWith ||
    filters.contains ||
    filters.minLength ||
    filters.maxLength ||
    filters.sellerName;

  useEffect(() => {
    (async () => {
      const status = await checkAuth();
      setIsAuthenticated(status === 'authenticated');
    })();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setLimit(500);
      setPage(1);
    }
  }, [searchQuery]);
  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        let res;
        if (searchQuery) {
          res = await axios.get(
            `${process.env.NEXT_PUBLIC_apiLink}domain/search`,
            {
              params: { search: searchQuery, limit: 'all', page: 1 }
            }
          );
        } else {
          const params: any = { page, limit };
          res = await axios.get(
            `${process.env.NEXT_PUBLIC_apiLink}domain/public`,
            { params }
          );
        }
        setDomains(
          (res.data.domains || []).map((d: Domain) => ({
            ...d,
            user: {
              ...d.user,
              userName:
                d.user?.userName === "Anonymous"
                  ? null
                  : d.user?.userName ?? null
            }
          }))
        );
        setTotal(res.data.total ?? res.data.domains.length);
      } catch {
        toast.error('Failed to load domains');
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, [page, limit, searchQuery]);
  const filteredDomains = domains
    .filter(d => {
      const full = d.domain.toLowerCase();
      const name = full.split('.')[0];

      if (
        filters.extensions.length &&
        !filters.extensions.some(ext => full.endsWith(ext))
      ) return false;

      if (filters.exact) {
        if (filters.startsWith && name !== filters.startsWith.toLowerCase()) return false;
        if (filters.endsWith && name !== filters.endsWith.toLowerCase()) return false;
        if (filters.contains && name !== filters.contains.toLowerCase()) return false;
      } else {
        if (filters.startsWith && !name.startsWith(filters.startsWith.toLowerCase())) return false;
        if (filters.endsWith && !name.endsWith(filters.endsWith.toLowerCase())) return false;
        if (filters.contains && !name.includes(filters.contains.toLowerCase())) return false;
      }
      if (filters.minLength && name.length < filters.minLength) return false;
      if (filters.maxLength && name.length > filters.maxLength) return false;

      if (filters.sellerName) {
        const seller = d.user?.userName?.toLowerCase() || '';
        if (!seller.includes(filters.sellerName.toLowerCase())) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const nameA = a.domain.toLowerCase().split('.')[0];
      const nameB = b.domain.toLowerCase().split('.')[0];

      switch (sortBy) {
        case 'az': return a.domain.localeCompare(b.domain);
        case 'za': return b.domain.localeCompare(a.domain);
        case 'length_asc': return nameA.length - nameB.length;
        case 'length_desc': return nameB.length - nameA.length;
        case 'newest': return +new Date(b.createdAt) - +new Date(a.createdAt);
        case 'oldest': return +new Date(a.createdAt) - +new Date(b.createdAt);
        default: return 0;
      }
    });

  return (
    <div className="w-full mt-10">
      <div className="rounded-2xl border border-gray-200/70 bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4
px-5 py-4
bg-white/60 backdrop-blur
border-b border-gray-200/70">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilter(v => !v)}
              className="
    inline-flex items-center justify-center
    bg-blue-600 hover:bg-blue-700
    text-white font-semibold
    px-5 py-2.5
    rounded-lg
    shadow-sm hover:shadow-md
    active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-blue-500/40
    transition-all duration-200
  "
            >
              {showFilter ? (
                <>
                  <X size={16} className="mr-2" />
                  Close Filter
                </>
              ) : (
                <>
                  <SlidersHorizontal size={16} className="mr-2" />
                  Filter
                </>
              )}
            </button>
            <button
              disabled={!hasActiveFilters}
              onClick={() => {
                setFilters(DEFAULT_FILTERS);
                setPage(1);
              }}
              className={`
    inline-flex items-center gap-2
    px-4 py-2 rounded-xl text-sm font-medium
    border transition-all duration-200
    ${hasActiveFilters
                  ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 shadow-sm hover:shadow-md'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'}
  `}
            >
              <RotateCcw size={16} />
              Clear Filters
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select
                value={limit}
                onChange={e => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white
               focus:outline-none focus:ring-2 focus:ring-blue-500/30
               hover:border-gray-400 transition"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={500}>500</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="border rounded-md px-2 py-1"
              >
                <option value="az">A–Z</option>
                <option value="za">Z–A</option>
                <option value="length_desc">Long → Short</option>
                <option value="length_asc">Short → Long</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex bg-transparent overflow-hidden">
          {showFilter && (
            <aside className="w-72 min-w-72 border-r border-gray-200/70 bg-gray-50/60 backdrop-blur-sm overflow-y-auto">
              <FilterDomain filters={filters} onChange={setFilters} />
            </aside>
          )}
          <div className="flex-1 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-1 text-sm">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-xs font-semibold text-slate-600 tracking-wide">
                  <th className="px-4 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-center">Message</th>
                  <th className="px-4 py-3 text-center">Seller</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-gray-500">
                      Loading domains...
                    </td>
                  </tr>
                ) : (
                  filteredDomains.map((d) => (
                    <tr
                      key={d.domainId}
                      className="
            bg-slate-50
            hover:bg-blue-50
            transition-colors
            rounded-lg
          "
                    >
                      {/* ✅ DOMAIN */}
                      <td className="px-4 py-3 text-blue-600 break-all font-medium">
                        {d.finalUrl ? (
                          <Link
                            href={d.finalUrl}
                            target="_blank"
                            className="hover:underline"
                          >
                            {d.domain}
                          </Link>
                        ) : (
                          d.domain
                        )}
                      </td>

                      {/* ✅ MESSAGE */}
                      <td className="px-4 py-3 text-center">
                        <div className="relative group inline-flex justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (!isAuthenticated) {
                                setAuthPopupOpen(true);
                                return;
                              }

                              if (!d.isChatActive) return;

                              setSelectedDomain(d);
                              setOpen(true);
                            }}
                            className={`
                  p-2 rounded-lg transition-all duration-150
                  ${!d.isChatActive
                                ? 'text-gray-400 cursor-not-allowed'
                                : isAuthenticated
                                  ? 'text-blue-600 hover:bg-blue-100 hover:scale-105'
                                  : 'text-gray-500 hover:bg-gray-100'
                              }
                `}
                            aria-label="Message seller"
                          >
                            <Send size={16} />
                          </button>

                          {/* ✅ TOOLTIP */}
                          <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                              {!d.isChatActive
                                ? 'Chat disabled — contact seller via the lander'
                                : isAuthenticated
                                  ? 'Message seller'
                                  : 'Log in to chat — or contact via lander'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ✅ SELLER */}
                      <td className="px-4 py-3 text-center">
                        {d.user?.userName ? (
                          <button
                            onClick={() => {
                              setShowFilter(true);
                              setFilters((prev) => ({
                                ...prev,
                                sellerName: d.user.userName,
                              }));
                              setPage(1);
                            }}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {d.user.userName}
                          </button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? 'bg-blue-600 text-white px-3 py-1 rounded' : ''}
              >
                {i + 1}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
          </div>
        )}
        <Modal
          isOpen={authPopupOpen}
          onClose={() => setAuthPopupOpen(false)}
          title="Message Seller"
        >
          <div className="relative space-y-4 text-sm text-gray-700">
            <p className="text-gray-600 leading-relaxed">
              Please sign up or log in to message the seller.
              Creating an account is completely free — no subscription required.
              <br />
              Email verification helps keep the marketplace secure and prevent spam.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Link
                href="/signup"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2.5 rounded-lg font-medium transition"
              >
                Create Free Account
              </Link>

              <Link
                href="/login"
                className="flex-1 border border-gray-300 hover:bg-gray-100 text-center px-4 py-2.5 rounded-lg font-medium transition"
              >
                Log In
              </Link>
            </div>

            <p className="text-xs text-gray-500 text-center pt-2">
              Takes less than a minute to get started
            </p>
          </div>
        </Modal>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Contact Seller">
          {selectedDomain && (
            <DomainReplyEmail
              domainId={selectedDomain.domainId}
              domain={selectedDomain.domain}
              onClose={() => setOpen(false)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default DomainTable;
