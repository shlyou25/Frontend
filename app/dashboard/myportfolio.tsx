'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '../../components/Loader';
import Modal from '../../components/model';
import AddDomainsCard from './adddomain';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import DomainStatus from './DomainStatus';
import Subscribe from '../../utils/subscribe';
import Confirmation from '../../components/Confirmation';

type DateRange = 'all' | 'today' | '7days' | '30days' | 'custom';

export interface DomainType {
  id: string;
  domain: string;
  status: string;
  isHidden: boolean;
  isChatActive: boolean;
  clicks: number;
  finalUrl?: string;
  createdAt: string;
}
type MyPortfolioProps = {
  searchQuery: string;
};
const Toggle = ({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  id: string;
}) => (
  <div className="relative inline-block w-11 h-5">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="peer appearance-none w-11 h-5 bg-slate-200 rounded-full
                 checked:bg-slate-800 cursor-pointer transition-colors duration-300"
    />
    <label
      htmlFor={id}
      className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full
                 border border-slate-300 shadow-sm transition-transform duration-300
                 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
    />
  </div>
);
const SegmentedTabs = ({
  active,
  onChange,
}: {
  active: 'domains' | 'status';
  onChange: (val: 'domains' | 'status') => void;
}) => (
  <div className="inline-flex bg-slate-100 rounded-full p-1">
    <button
      onClick={() => onChange('domains')}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition
        ${active === 'domains'
          ? 'bg-white shadow text-slate-900'
          : 'text-slate-500 hover:text-slate-700'
        }`}
    >
      My Domains
    </button>

    <button
      onClick={() => onChange('status')}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition
        ${active === 'status'
          ? 'bg-white shadow text-slate-900'
          : 'text-slate-500 hover:text-slate-700'
        }`}
    >
      Domain Status
    </button>
  </div>
);

const StatusHeader = ({
  active,
  onChange,
  customFrom,
  customTo,
  setCustomFrom,
  setCustomTo,
}: {
  active: DateRange;
  onChange: (val: DateRange) => void;
  customFrom: string;
  customTo: string;
  setCustomFrom: React.Dispatch<React.SetStateAction<string>>;
  setCustomTo: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="mb-4 rounded-xl border bg-blue-50 px-4 py-3">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold text-slate-800">
          Domain Health Monitoring
        </h2>
        <p className="text-xs text-slate-600">
          Filter domains by activity period
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        {[
          { key: 'all', label: 'All' },
          { key: 'today', label: 'Today' },
          { key: '7days', label: '7 Days' },
          { key: '30days', label: '30 Days' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key as DateRange)}
            className={`rounded-full px-3 py-1 border transition cursor-pointer
              ${active === key
                ? 'bg-blue-600 text-white border-blue-600 '
                : 'bg-white text-slate-600 hover:bg-blue-100'
              }`}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => active !== 'custom' && onChange('custom')}
          className={`rounded-full px-3 py-1 border transition inline-flex items-center gap-1 cursor-pointer
    ${active === 'custom'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-slate-600 hover:bg-blue-100'
            }`}
        >
          <Calendar size={14} />
          Date Range
        </button>

      </div>
    </div>

    {/* Calendar Inputs (NEVER UNMOUNTED) */}
    <div className={`mt-3 ${active === 'custom' ? 'block' : 'hidden'}`}>
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div>
          <label className="block text-slate-600 mb-1">From</label>
          <input
            type="date"
            value={customFrom}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setCustomFrom(e.target.value)}
            className="rounded-md border px-2 py-1 text-slate-700"
          />
        </div>

        <div>
          <label className="block text-slate-600 mb-1">To</label>
          <input
            type="date"
            value={customTo}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setCustomTo(e.target.value)}
            className="rounded-md border px-2 py-1 text-slate-700"
          />
        </div>
      </div>
    </div>
  </div>
);

const Myportfolio = ({ searchQuery }: MyPortfolioProps) => {
  const [loading, setLoading] = useState(true);
  const [userDomains, setUserDomains] = useState<DomainType[]>([]);
  const [domainStatus, setDomainStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);


  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_apiLink}domain`;
  const [dateRange, setDateRange] = useState<DateRange>('all');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}auth/authenticate`,
          { withCredentials: true }
        );
        setLoading(false);
      } catch {
        router.push('/signup');
      }
    };
    checkAuth();
  }, [router]);
  const filterBySearch = (domains: DomainType[]) => {
    if (!searchQuery?.trim()) return domains;

    return domains.filter((d) =>
      d.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  const fetchDomains = async () => {
    const res = await axios.get(`${API}/getdomainbyuser`, {
      withCredentials: true,
    });
    setUserDomains(res.data.domains || []);
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const toggleHide = async (id: string, value: boolean) => {
    const prev = [...userDomains];
    setUserDomains((d) =>
      d.map((x) => (x.id === id ? { ...x, isHidden: value } : x))
    );

    try {
      const res = await axios.patch(
        `${API}/${id}/toggle-hide`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
    } catch {
      setUserDomains(prev);
    }
  };

  const toggleChat = async (id: string, value: boolean) => {
    const prev = [...userDomains];
    setUserDomains((d) =>
      d.map((x) => (x.id === id ? { ...x, isChatActive: value } : x))
    );

    try {
      const res = await axios.patch(
        `${API}/${id}/toggle-chat`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
    } catch {
      setUserDomains(prev);
    }
  };

  const deleteDomain = async (id: string) => {
    const prev = [...userDomains];
    setUserDomains((d) => d.filter((x) => x.id !== id));

    try {
      const res = await axios.delete(`${API}/${id}`, {
        withCredentials: true,
      });
      toast.success(res?.data?.message);
    } catch {
      setUserDomains(prev);
    }
  };
  const filterDomainsByDate = (domains: DomainType[]) => {
    if (dateRange === 'all') return domains;

    const now = new Date();

    return domains.filter((d) => {
      const created = new Date(d.createdAt);
      const diff = now.getTime() - created.getTime();

      if (dateRange === 'today') {
        return (
          created.getDate() === now.getDate() &&
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }

      if (dateRange === '7days') {
        return diff <= 7 * 24 * 60 * 60 * 1000;
      }

      if (dateRange === '30days') {
        return diff <= 30 * 24 * 60 * 60 * 1000;
      }

      if (dateRange === 'custom') {
        if (!customFrom || !customTo) return true;

        const from = new Date(customFrom);
        const to = new Date(customTo);

        to.setHours(23, 59, 59, 999);

        return created >= from && created <= to;
      }

      return true;
    });
  };
  const searchedDomains = useMemo(() => {
    if (!searchQuery?.trim()) return userDomains;

    return userDomains.filter((d) =>
      d.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userDomains, searchQuery]);

  const dateFilteredDomains = useMemo(() => {
    return filterDomainsByDate(searchedDomains);
  }, [searchedDomains, dateRange, customFrom, customTo]);


  if (loading) return <Loader />;
  return (
    <div className="lg:px-[10%] lg:pt-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <SegmentedTabs
            active={domainStatus ? 'status' : 'domains'}
            onChange={(val) => setDomainStatus(val === 'status')}
          />

          <button
            onClick={() => setOpen(true)}
            className="
    inline-flex items-center gap-2
    rounded-full border border-blue-600
    bg-white px-4 py-1.5
    text-sm font-medium text-blue-600
    transition
    hover:bg-blue-50
    focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer
  "
          >
            + Add Domain
          </button>
        </div>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Domains">
          <AddDomainsCard
            onClose={() => {
              setOpen(false);
              fetchDomains();
            }}
          />
        </Modal>
        {domainStatus ? (
          <>
            <StatusHeader
              active={dateRange}
              onChange={setDateRange}
              customFrom={customFrom}
              customTo={customTo}
              setCustomFrom={setCustomFrom}
              setCustomTo={setCustomTo}
            />
            <DomainStatus
              data={dateFilteredDomains}
              onDeleteSuccess={fetchDomains}
            />
          </>
        ) : (
          <div className="rounded-xl border bg-white shadow-sm overflow-x-auto max-h-130 overflow-y-auto">
            <table className="min-w-full border-separate border-spacing-y-1">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-xs text-slate-600">
                  <th className="px-4 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-center">Hide</th>
                  <th className="px-4 py-3 text-center">Chat</th>
                  <th className="px-4 py-3 text-center cursor-pointer">Delete</th>
                  <th className="px-4 py-3 text-center">Added</th>
                </tr>
              </thead>
              <tbody>
                {searchedDomains
                  .filter((d) => d.status === 'Pass')
                  .map((d) => (
                    <tr
                      key={d.id}
                      className="bg-slate-50 hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-2 break-all text-blue-600">
                        {d.finalUrl ? (
                          <Link
                            href={d.finalUrl}
                            target="_blank"
                            className="hover:underline"
                          >
                            {d.domain}
                          </Link>
                        ) : (
                          <span className="text-slate-700">{d.domain}</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Toggle
                          id={`hide-${d.id}`}
                          checked={d.isHidden}
                          onChange={(val) => toggleHide(d.id, val)}
                        />
                      </td>

                      <td className="px-4 py-2 text-center">
                        <Toggle
                          id={`chat-${d.id}`}
                          checked={d.isChatActive}
                          onChange={(val) => toggleChat(d.id, val)}
                        />
                      </td>

                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            setPendingDeleteId(d.id);
                            setConfirmOpen(true);
                          }}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>

                      </td>

                      <td className="px-4 py-2 text-center text-xs text-slate-600">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <Subscribe />
      </div>
      <Confirmation
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingDeleteId(null);
        }}
        onConfirm={async () => {
          if (!pendingDeleteId) return;

          await deleteDomain(pendingDeleteId);
          setConfirmOpen(false);
          setPendingDeleteId(null);
        }}
      />

    </div>
  );
};

export default Myportfolio;
