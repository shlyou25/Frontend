'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import Modal from '@/components/model';
import EmailTemplate from '@/components/EmailTemplate';
import { toast } from 'react-toastify';


interface Domain {
  domainId: string;
  domain: string;
  isChatActive: boolean;
  user: {
    name: string;
  };
}
interface DomainTableProps {
  searchQuery: string;
}

const DomainTable = ({ searchQuery }: DomainTableProps) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);


  // modal state
  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}domain/public`,
          { params: { page, limit: limit } }
        );
        setDomains(res.data.domains);
        setTotal(res.data.total);
      } catch {
        toast.error('Failed to load domains');
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, [page, limit]);

  // 🔹 Open modal
  const handleConnect = (domain: Domain) => {
    if (!domain.isChatActive) return;
    setSelectedDomain(domain);
    setOpen(true);
  };

  const filteredDomains = domains.filter(d =>
    d.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full mt-10">

      {/* ✅ EMAIL MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Contact Seller"
      >
        {selectedDomain && (
          <EmailTemplate
            domainId={selectedDomain.domainId}
            domain={selectedDomain.domain}
            onClose={() => setOpen(false)}
          />
        )}
      </Modal>

      {/* TABLE */}
      <div className="rounded-xl border border-blue-100">

        {/* PAGE SIZE SELECTOR (STAYS FIXED) */}
        <div className="flex justify-end px-4 py-3 border-b bg-white">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>per page</span>
          </div>
        </div>
        {/* SCROLL CONTAINER */}
        <div className="overflow-x-auto max-h-105 overflow-y-auto">
          <table className="w-full min-w-150 text-sm border-collapse">

            {/* FIXED HEADER */}
            <thead className="sticky top-0 z-10 bg-blue-50 text-blue-900 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4 text-left font-medium bg-blue-50">
                  Domain
                </th>
                <th className="px-6 py-4 text-center font-medium bg-blue-50">
                  Connect
                </th>
                <th className="px-6 py-4 text-left font-medium bg-blue-50">
                  Seller
                </th>
              </tr>
            </thead>

            {/* SCROLLING BODY */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-gray-500">
                    Loading domains...
                  </td>
                </tr>
              ) : (
                filteredDomains.map((d) => (
                  <tr key={d.domainId} className="border-t">
                    <td className="px-6 py-4">
                      <span className="text-blue-700 font-medium break-all">
                        {d.domain}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleConnect(d)}
                        disabled={!d.isChatActive}
                        className={
                          d.isChatActive
                            ? 'text-blue-600 hover:text-blue-800 cursor-pointer'
                            : 'text-gray-400 cursor-not-allowed'
                        }
                        title={d.isChatActive ? 'Connect' : 'Chat disabled'}
                      >
                        <Send size={16} />
                      </button>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {d.user?.name || 'Anonymous'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-2 py-1 text-gray-500 disabled:opacity-40"
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNo = i + 1;
            return (
              <button
                key={pageNo}
                onClick={() => setPage(pageNo)}
                className={`px-3 py-1 rounded ${page === pageNo
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {pageNo}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-2 py-1 text-gray-500 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default DomainTable;
