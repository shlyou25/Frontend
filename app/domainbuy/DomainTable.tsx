'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import Modal from '../../components/model';
import EmailTemplate from '../../components/EmailTemplate'
import { toast } from 'react-toastify';
import Link from 'next/link';
import FilterDomain, { DomainFilters } from '../../components/FilterDashboard';
import { Filter, RotateCcw } from 'lucide-react';


interface Domain {
  domainId: string;
  finalUrl: string;
  domain: string;
  isChatActive: boolean;
  createdAt: string;
  user: { name: string, email: string };
}

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const DomainTable = ({ searchQuery, setSearchQuery }: Props) => {
  const [showFilter, setShowFilter] = useState(true);
  const [filters, setFilters] = useState<DomainFilters>({ extensions: [] });

  const [domains, setDomains] = useState<Domain[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | 'all'>(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const numericLimit = limit === 'all' ? total : limit;
  const totalPages = limit === 'all'
    ? 1
    : Math.ceil(total / numericLimit);

  type SortOption = 'az' | 'za' | 'length_desc' | 'newest' | 'oldest';
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    if (searchQuery) {
      setLimit('all');
      setPage(1);
    }
  }, [searchQuery]);


  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);

        let res;

        if (searchQuery) {
          // 🔍 SEARCH MODE
          res = await axios.get(
            `${process.env.NEXT_PUBLIC_apiLink}domain/search`,
            {
              params: {
                search: searchQuery,   // ✅ correct key
                limit: 'all',
                page: 1
              }
            }
          );

        } else {
          // 📄 BROWSE MODE
          const params: any = { page };

          if (limit !== 'all') {
            params.limit = limit;
          } else {
            params.all = true;
          }

          res = await axios.get(
            `${process.env.NEXT_PUBLIC_apiLink}domain/public`,
            { params }
          );
        }

        setDomains(res.data.domains);
        setTotal(res.data.total ?? res.data.domains.length);

      } catch {
        toast.error('Failed to load domains');
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, [page, limit, searchQuery]);


  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

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

      if (
        filters.sellerName &&
        !d.user?.name?.toLowerCase().includes(filters.sellerName.toLowerCase())
      ) return false;

      return true;
    })
    .sort((a, b) => {
      const nameA = a.domain.toLowerCase().split('.')[0];
      const nameB = b.domain.toLowerCase().split('.')[0];
      switch (sortBy) {
        case 'az':
          return a.domain.localeCompare(b.domain);
        case 'za':
          return b.domain.localeCompare(a.domain);

        case 'length_desc':
          return nameB.length - nameA.length;

        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

        default:
          return 0;
      }
    });
  const hasActiveFilters =
    filters.extensions.length > 0 ||
    filters.startsWith ||
    filters.endsWith ||
    filters.contains ||
    filters.exact ||
    filters.minLength ||
    filters.maxLength ||
    filters.sellerName ||
    searchQuery;

  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-between px-4 py-3 border rounded-t-xl bg-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilter(v => !v)}
            className="
    inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white
    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  "
          >
            <Filter size={16} />
            {showFilter ? 'Hide filters' : 'Filters'}
          </button>

          {hasActiveFilters &&
            <button
              onClick={() => {
                setFilters({ extensions: [] });
                setSearchQuery('');
                setPage(1);
                setLimit(10);
              }}
              disabled={
                !filters.extensions.length &&
                !filters.startsWith &&
                !filters.endsWith &&
                !filters.contains &&
                !filters.exact &&
                !filters.minLength &&
                !filters.maxLength &&
                !filters.sellerName &&
                !searchQuery
              }
              title="Reset all filters and search"
              className="
    inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium
    text-gray-600 hover:bg-gray-100
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent
  "
            >
              <RotateCcw size={16} />
              Reset filters
            </button>
          }

        </div>

        {/* RIGHT: Show dropdown */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show</span>
          <select
            value={limit}
            onChange={e => {
              const value = e.target.value;
              setLimit(value === 'all' ? 'all' : Number(value));
              setPage(1);
            }}
            className="rounded-md border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <div className="flex border border-t-0 rounded-b-xl bg-white overflow-hidden min-h-150">
        {showFilter && (
          <aside className="w-75 min-w-75 border-r bg-gray-50 overflow-y-auto">
            <FilterDomain
              filters={filters}
              onChange={setFilters}
            />
          </aside>
        )}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-1 text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-xs font-semibold text-slate-600 tracking-wide">
                <th className="px-6 py-3 text-left">Domain</th>
                <th className="px-6 py-3 text-center">Contact</th>
                <th className="px-6 py-3 text-left">Seller</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-sm text-slate-500">

                    Loading domains...
                  </td>
                </tr>
              ) : (
                filteredDomains.map(d => (
                  <tr
                    key={d.domainId}
                    className="bg-slate-50 hover:bg-blue-50 transition"
                  >
                    <td className="px-6 py-3 text-blue-600 break-all">

                      {d.finalUrl ? (
                        <Link href={d.finalUrl} target="_blank" className="text-blue-600 hover:underline">
                          {d.domain}
                        </Link>
                      ) : d.domain}
                    </td>

                    <td className="px-6 py-3 text-center">
                      <button
                        disabled={!d.isChatActive}
                        onClick={() => {
                          setSelectedDomain(d);
                          setOpen(true);
                        }}
                        className={
                          d.isChatActive
                            ? 'text-blue-600 hover:text-blue-800'
                            : 'text-gray-400 cursor-not-allowed'
                        }
                      >
                        <Send size={16} />
                      </button>
                    </td>

                    <td className="px-6 py-3 text-blue-600 break-all">

                      {d.user?.name ? (
                        <button
                          onClick={() => {
                            setShowFilter(true); // ensure filter panel is open
                            setFilters(prev => ({
                              ...prev,
                              sellerName: d.user.name
                            }));
                            setPage(1);
                          }}
                          className="text-blue-600 hover:underline font-medium cursor-pointer"
                        >
                          {d.user.name}
                        </button>
                      ) : (
                        'Anonymous'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tbody>
              {filteredDomains.length === 0 && !loading && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-sm text-slate-500">
                    No domains found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
      {limit !== 'all' && totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6 text-sm">
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
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Contact Seller">
        {selectedDomain && (
          <EmailTemplate
            domainId={selectedDomain.domainId}
            domain={selectedDomain.domain}
            onClose={() => setOpen(false)}
            sellerEmail={selectedDomain.user.email}
          />
        )}
      </Modal>
    </div>
  );
};

export default DomainTable;
