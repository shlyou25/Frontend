'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import Modal from '@/components/model';
import EmailTemplate from '@/components/EmailTemplate';
import { toast } from 'react-toastify';
import Link from 'next/link';
import FilterDomain, { DomainFilters } from '@/components/FilterDashboard';

interface Domain {
  domainId: string;
  finalUrl: string;
  domain: string;
  isChatActive: boolean;
  user: { name: string };
}
interface Props {
  searchQuery: string;
}
const DomainTable = ({ searchQuery }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
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


  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const params: any = { page };
        if (limit !== 'all') {
          params.limit = limit;
        } else {
          params.all = true;
        }
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}domain/public`,
          { params }
        );
        setDomains(res.data.domains);
        setTotal(res.data.total);
        if (res.data.capped) {
          toast.info(
            `Showing first ${res.data.capLimit} domains for performance reasons`
          );
        }

      } catch {
        toast.error('Failed to load domains');
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, [page, limit]);

  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

  const filteredDomains = domains.filter(d => {
    const full = d.domain.toLowerCase();
    const name = full.split('.')[0];
    const search = searchQuery.toLowerCase();

    if (search && !full.includes(search)) return false;

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
  });

  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-between px-4 py-3 border rounded-t-xl bg-white">
        <button
          onClick={() => setShowFilter(v => !v)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
        >
          {showFilter ? 'Close Filter' : 'Filter'}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Show</span>
          <select
            value={limit}
            onChange={e => {
              const value = e.target.value;
              setLimit(value === 'all' ? 'all' : Number(value));
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

                    <td className="px-6 py-4">
                      {d.user?.name || 'Anonymous'}
                    </td>
                  </tr>
                ))
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
          />
        )}
      </Modal>
    </div>
  );
};

export default DomainTable;
