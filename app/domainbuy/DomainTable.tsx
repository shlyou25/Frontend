'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import Modal from '../../components/model';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { checkAuth } from '@/utils/checkAuth';
import DomainReplyEmail from "./DomainReplyEmail";
import FilterDomain, { DomainFilters } from '../../components/FilterDashboard';

/* ---------------- TYPES ---------------- */

interface Domain {
  domainId: string;
  finalUrl: string;
  domain: string;
  isChatActive: boolean;
  createdAt: string;
  user: { name: string; email: string };
}

interface Props {
  searchQuery: string;
}

type SortOption = 'az' | 'za' | 'length_desc' | 'newest' | 'oldest';

/* ---------------- CONSTANTS ---------------- */

const DEFAULT_FILTERS: DomainFilters = {
  extensions: [],
};

/* ---------------- COMPONENT ---------------- */

const DomainTable = ({ searchQuery }: Props) => {
  const router = useRouter();

  /* UI state */
  const [showFilter, setShowFilter] = useState(true);
  const [open, setOpen] = useState(false);

  /* data state */
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  /* filters / sorting / paging */
  const [filters, setFilters] = useState<DomainFilters>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | 'all'>(10);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  /* derived values */
  const numericLimit = limit === 'all' ? total : limit;
  const totalPages =
    limit === 'all' ? 1 : Math.ceil(total / numericLimit);

  const hasActiveFilters =
    filters.extensions.length ||
    filters.startsWith ||
    filters.endsWith ||
    filters.contains ||
    filters.minLength ||
    filters.maxLength ||
    filters.sellerName;

  /* ---------------- EFFECTS ---------------- */

  // Search → force ALL results
  useEffect(() => {
    if (searchQuery) {
      setLimit('all');
      setPage(1);
    }
  }, [searchQuery]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

  // Fetch domains
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
          const params: any = { page };
          limit === 'all' ? (params.all = true) : (params.limit = limit);

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

  /* ---------------- FILTER + SORT ---------------- */

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
        case 'az': return a.domain.localeCompare(b.domain);
        case 'za': return b.domain.localeCompare(a.domain);
        case 'length_desc': return nameB.length - nameA.length;
        case 'newest': return +new Date(b.createdAt) - +new Date(a.createdAt);
        case 'oldest': return +new Date(a.createdAt) - +new Date(b.createdAt);
        default: return 0;
      }
    });

  /* ---------------- RENDER ---------------- */

  return (
    <div className="w-full mt-10">

      {/* 🔝 TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border rounded-t-xl bg-white">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilter(v => !v)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            {showFilter ? 'Close Filter' : 'Filter'}
          </button>

          <button
            disabled={!hasActiveFilters}
            onClick={() => {
              setFilters(DEFAULT_FILTERS);
              setPage(1);
            }}
            className={`px-4 py-2 border rounded-md text-sm
              ${hasActiveFilters
                ? 'hover:bg-gray-100 text-gray-700'
                : 'opacity-40 cursor-not-allowed'}
            `}
          >
            Clear Filters
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-sm text-gray-600">

          {/* PAGE LIMIT — RESTORED ✅ */}
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={limit}
              onChange={e => {
                const val = e.target.value;
                setLimit(val === 'all' ? 'all' : Number(val));
                setPage(1);
              }}
              className="border rounded-md px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value="all">All</option>
            </select>
          </div>

          {/* SORT */}
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
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🧱 CONTENT */}
      <div className="flex border border-t-0 rounded-b-xl bg-white overflow-hidden min-h-150">

        {showFilter && (
          <aside className="w-75 min-w-75 border-r bg-gray-50 overflow-y-auto">
            <FilterDomain filters={filters} onChange={setFilters} />
          </aside>
        )}

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-4 text-left">Domain</th>
                <th className="px-6 py-4 text-center">Connect</th>
                <th className="px-6 py-4 text-left">Seller</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-gray-500">
                    Loading domains...
                  </td>
                </tr>
              ) : (
                filteredDomains.map(d => (
                  <tr key={d.domainId} className="border-t">
                    <td className="px-6 py-4">
                      {d.finalUrl ? (
                        <Link href={d.finalUrl} target="_blank" className="text-blue-600 hover:underline">
                          {d.domain}
                        </Link>
                      ) : d.domain}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        disabled={!d.isChatActive}
                        onClick={async () => {
                          const status = await checkAuth();
                          if (status === 'unauthenticated') {
                            router.push('/login');
                            return;
                          }
                          setSelectedDomain(d);
                          setOpen(true);
                        }}
                      >
                        <Send size={16} />
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      {d.user?.name ? (
                        <button
                          onClick={() => {
                            setShowFilter(true);
                            setFilters(prev => ({
                              ...prev,
                              sellerName: d.user.name
                            }));
                            setPage(1);
                          }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {d.user.name}
                        </button>
                      ) : 'Anonymous'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📄 PAGINATION */}
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

      {/* ✉️ MODAL */}
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
  );
};

export default DomainTable;
