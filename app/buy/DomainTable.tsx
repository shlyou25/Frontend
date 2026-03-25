'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Send, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { checkAuth } from '@/utils/checkAuth';
import DomainReplyEmail from "./DomainReplyEmail";
import FilterDomain, { DomainFilters } from '../../components/FilterDashboard';
import Drawer from './Drawer';

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
  setSearchQuery: (value: string) => void;
}
type SortOption = | 'az' | 'za' | 'length_asc' | 'length_desc' | 'newest' | 'oldest';

const DEFAULT_FILTERS: DomainFilters = {
  extensions: [],
};

const DomainTable = ({ searchQuery, setSearchQuery }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [filters, setFilters] = useState<DomainFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState(0);
  const [authDrawerOpen, setAuthDrawerOpen] = useState(false);
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
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowFilter(true);
      } else {
        setShowFilter(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    (async () => {
      const status = await checkAuth();
      setIsAuthenticated(status === 'authenticated');
    })();
  }, []);
  const getPagination = () => {
    const delta = 2 // pages around current
    const range = []
    const rangeWithDots = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i)
      }
    }

    let prev = 0
    for (let i of range) {
      if (i - prev === 2) {
        rangeWithDots.push(prev + 1)
      } else if (i - prev > 2) {
        rangeWithDots.push("...")
      }
      rangeWithDots.push(i)
      prev = i
    }

    return rangeWithDots
  }
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
            { params: { search: searchQuery, limit: 'all', page: 1 } }
          );

        } else if (filters.sellerName) {
          try {
            res = await axios.get(
              `${process.env.NEXT_PUBLIC_apiLink}domain/seller/${filters.sellerName}`,
              { params: { page, limit } }
            );
          } catch (err: any) {
            if (err.response?.status === 404) {
              setDomains([]);
              setTotal(0);
              return;
            }
            throw err;
          }

        } else {
          res = await axios.get(
            `${process.env.NEXT_PUBLIC_apiLink}domain/public`,
            {
              params: {
                page,
                limit,
                sortBy,
                search: searchQuery,
                extensions: filters.extensions.join(","),
                startsWith: filters.startsWith,
                endsWith: filters.endsWith,
                contains: filters.contains,
                minLength: filters.minLength,
                maxLength: filters.maxLength,
                sellerName: filters.sellerName
              }
            }
          );
        }

        const domainsData = res?.data?.domains ?? [];

        setDomains(
          domainsData.map((d: Domain) => ({
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
        setTotal(res?.data?.total ?? domainsData.length);
      } catch (err: any) {
        if (!err.response || err.response.status >= 500) {
          toast.error('Something went wrong. Please try again.');
        }

        setDomains([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, [page,limit,searchQuery,filters,sortBy]);

const filteredDomains = domains;
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
              disabled={!hasActiveFilters && !searchQuery}
              onClick={() => {
                setFilters(DEFAULT_FILTERS);
                setPage(1);
                setSearchQuery("");
              }}
              className={`
    inline-flex items-center gap-2
    px-4 py-2 rounded-xl text-sm font-medium
    border transition-all duration-200
    ${hasActiveFilters || searchQuery
                  ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 shadow-sm hover:shadow-md'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                }
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
            <table className="min-w-full border-b border-gray-100 hover:bg-blue-50/60 transition-all text-sm table-fixed">
              <colgroup>
                <col className="w-20" />
                <col className="w-64" />
                <col className="w-64" />
              </colgroup>
              <thead className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-200">
                <tr className="text-xs text-gray-700 uppercase font-semibold tracking-wide">
                  <th className="px-5 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-center">Chat</th>
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
                ) : filteredDomains.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-gray-400">
                      No domains found
                    </td>
                  </tr>
                ) : (
                  filteredDomains.map((d) => (
                    <tr
                      key={d.domainId}
                      className="
            bg-white
            hover:bg-blue-50/60
            transition-all
            rounded-xl
            shadow-sm hover:shadow-md
            hover:-translate-y-px
          "
                    >
                      <td className="px-5 py-4 font-medium">
                        <div className="w-full max-w-130 truncate">
                          <Link
                            href={d.finalUrl || `https://${d.domain}`}
                            target="_blank"
                            title={d.domain}
                            className="text-blue-600 hover:text-blue-700 hover:underline text-lg"
                          >
                            {d.domain}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center align-middle">
                        <div className="relative group inline-flex justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              if (!isAuthenticated) {
                                setAuthDrawerOpen(true);
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
                          <div className="absolute bottom-full mb-2 hidden group-hover:block z-50">
                            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                              {!d.isChatActive
                                ? 'Chat for this domain is disabled; please contact seller via the lander.'
                                : isAuthenticated
                                  ? 'Message seller'
                                  : 'Log in to use the chat feature, or contact seller via the lander.'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center align-middle">
                        {d.user?.userName ? (
                          <button
                            onClick={() => {
                              setShowFilter(true);
                              setSearchQuery(""); // reset search
                              setFilters(prev => ({
                                ...prev,
                                sellerName: d.user.userName,
                              }));
                              setPage(1);
                            }}
                            className="text-blue-600 hover:text-blue-700 hover:underline font-semibold whitespace-nowrap"
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
          <nav className="flex items-center justify-center mt-8 text-sm select-none">

            <div className="flex items-center gap-1">

              {/* Prev */}
              <button
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-2 py-1 text-gray-500 hover:text-gray-900 disabled:opacity-30"
              >
                ‹
              </button>

              {getPagination().map((p, i) =>
                p === "..." ? (
                  <span
                    key={i}
                    className="px-2 text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={i}
                    aria-current={page === p ? "page" : undefined}
                    onClick={() => setPage(Number(p))}
                    className={`
              px-2.5 py-1 rounded-md transition-all duration-150

              ${page === p
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-600 hover:text-gray-900"
                      }
            `}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                aria-label="Next page"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-2 py-1 text-gray-500 hover:text-gray-900 disabled:opacity-30"
              >
                ›
              </button>

            </div>
          </nav>
        )}
      </div>
      <Drawer
        isOpen={authDrawerOpen}
        onClose={() => setAuthDrawerOpen(false)}
        title="Message Seller"
      >
        <div className="space-y-4 text-sm text-gray-700">
          <p className="text-gray-600 leading-relaxed">
            Please sign up or log in to message the seller.
            Creating an account is completely free — no subscription required.
            <br />
            Email verification helps keep the marketplace secure and prevent spam.
          </p>

          <div className="flex flex-col gap-3 pt-3">
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2.5 rounded-lg font-medium transition"
              onClick={() => setAuthDrawerOpen(false)}
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="border border-gray-300 hover:bg-gray-100 text-center px-4 py-2.5 rounded-lg font-medium transition"
              onClick={() => setAuthDrawerOpen(false)}
            >
              Log In
            </Link>
          </div>

          <p className="text-xs text-gray-500 text-center pt-2">
            Takes less than a minute to get started
          </p>
        </div>
      </Drawer>
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Contact Seller"
      >
        {selectedDomain && (
          <DomainReplyEmail
            domainId={selectedDomain.domainId}
            domain={selectedDomain.domain}
            onClose={() => setOpen(false)}
          />
        )}
      </Drawer>
    </div>
  );
};

export default DomainTable;
