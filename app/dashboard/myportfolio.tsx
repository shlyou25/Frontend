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
import ActionConfirmation from './ActionConfirmation';
import SearchBox from '@/utils/SearchBox';

type DateRange = 'all' | 'today' | '7days' | '30days' | 'custom';

export interface DomainType {
  id: string;
  domain: string;
  status: string;
  isHidden: boolean;
  isChatActive: boolean;
  isMessageNotificationEnabled: boolean;
  clicks: number;
  finalUrl?: string;
  createdAt: string;
}

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
            className={`rounded-full px-3 py-1 border transition
              ${active === key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 hover:bg-blue-100'
              }`}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => onChange('custom')}
          className={`rounded-full px-3 py-1 border inline-flex items-center gap-1 transition
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

    {active === 'custom' && (
      <div className="mt-3 flex gap-3 text-xs">
        <div>
          <label className="block mb-1">From</label>
          <input
            type="date"
            value={customFrom}
            onChange={(e) => setCustomFrom(e.target.value)}
            className="rounded-md border px-2 py-1"
          />
        </div>
        <div>
          <label className="block mb-1">To</label>
          <input
            type="date"
            value={customTo}
            onChange={(e) => setCustomTo(e.target.value)}
            className="rounded-md border px-2 py-1"
          />
        </div>
      </div>
    )}
  </div>
);

const Myportfolio = () => {

  type BulkAction =
    | { type: 'hide'; value: boolean }
    | { type: 'chat'; value: boolean }
    | { type: 'delete' }
    | null;


  const [loading, setLoading] = useState(true);
  const [userDomains, setUserDomains] = useState<DomainType[]>([]);
  const [domainStatus, setDomainStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [bulkAction, setBulkAction] = useState<BulkAction>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<DomainType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_apiLink}domain`;

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
  useEffect(() => {
    setSearchQuery('');
  }, [domainStatus]);

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
  const toggleNotification = async (id: string, value: boolean) => {
    const prev = [...userDomains];

    setUserDomains((d) =>
      d.map((x) =>
        x.id === id
          ? { ...x, isMessageNotificationEnabled: value }
          : x
      )
    );

    try {
      const res = await axios.patch(
        `${API}/${id}/toggle-message-notification`,
        {},
        { withCredentials: true }
      );
      toast.success(res?.data?.message);
    } catch {
      setUserDomains(prev);
      toast.error("Failed to update notification setting");
    }
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
  const searchedDomains = useMemo(() => {
    if (!searchQuery?.trim()) return userDomains;
    return userDomains.filter((d) =>
      d.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userDomains, searchQuery]);
  const visibleDomains = searchedDomains.filter(d => d.status === 'Pass');

  const isSelected = (id: string) =>
    selectedDomains.some(d => d.id === id);

  const isAllSelected =
    visibleDomains.length > 0 &&
    selectedDomains.length === visibleDomains.length;

  const toggleSelectAll = () => {
    setSelectedDomains(isAllSelected ? [] : visibleDomains);
  };

  const toggleRow = (domain: DomainType) => {
    setSelectedDomains(prev =>
      prev.some(d => d.id === domain.id)
        ? prev.filter(d => d.id !== domain.id)
        : [...prev, domain]
    );
  };
  const executeBulkAction = async () => {
    if (!bulkAction || !selectedDomains.length) return;

    const ids = selectedDomains.map(d => d.id);
    const prev = [...userDomains];

    try {
      if (bulkAction.type === 'hide') {
        setUserDomains(d =>
          d.map(x =>
            ids.includes(x.id)
              ? { ...x, isHidden: bulkAction.value }
              : x
          )
        );

        await axios.patch(
          `${API}/bulk-toggle-hide`,
          { ids, value: bulkAction.value },
          { withCredentials: true }
        );

        toast.success(
          bulkAction.value ? 'Domains hidden' : 'Domains unhidden'
        );
      }

      if (bulkAction.type === 'chat') {
        setUserDomains(d =>
          d.map(x =>
            ids.includes(x.id)
              ? { ...x, isChatActive: bulkAction.value }
              : x
          )
        );

        await axios.patch(
          `${API}/bulk-toggle-chat`,
          { ids, value: bulkAction.value },
          { withCredentials: true }
        );

        toast.success(
          bulkAction.value ? 'Chat enabled' : 'Chat disabled'
        );
      }

      if (bulkAction.type === 'delete') {
        await axios.delete(`${API}/bulk-delete`, {
          data: { ids },
          withCredentials: true,
        });

        toast.success(`${ids.length} domains deleted`);
        fetchDomains();
      }

      setSelectedDomains([]);
      setBulkMode(false);
    } catch {
      setUserDomains(prev);
      toast.error('Bulk action failed');
    }
  };


  const dateFilteredDomains = useMemo(() => {
    if (dateRange === 'all') return searchedDomains;
    const now = new Date();

    return searchedDomains.filter((d) => {
      const created = new Date(d.createdAt);
      const diff = now.getTime() - created.getTime();

      if (dateRange === 'today')
        return created.toDateString() === now.toDateString();
      if (dateRange === '7days') return diff <= 7 * 86400000;
      if (dateRange === '30days') return diff <= 30 * 86400000;
      if (dateRange === 'custom') {
        if (!customFrom || !customTo) return true;
        const from = new Date(customFrom);
        const to = new Date(customTo);
        to.setHours(23, 59, 59, 999);
        return created >= from && created <= to;
      }
      return true;
    });
  }, [searchedDomains, dateRange, customFrom, customTo]);

  if (loading) return <Loader />;

  return (
    <div className="lg:px-[10%] lg:pt-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setDomainStatus(false)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition
      border cursor-pointer
      ${!domainStatus
                ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                : 'bg-slate-100 border-transparent text-slate-500 hover:text-slate-700'
              }`}
          >
            My Domains
          </button>

          <div className="flex-1 flex justify-center">
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="inline-flex bg-slate-100 rounded-full p-1 gap-1">
            <button
              onClick={() => setDomainStatus(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer
        ${domainStatus
                  ? 'bg-white shadow text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              Upload Status
            </button>

            <button
              onClick={() => setOpen(true)}
              className="px-4 py-1.5 rounded-full text-sm font-medium
        text-blue-600 hover:bg-blue-50 transition cursor-pointer"
            >
              + Add Domain
            </button>
          </div>
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
            <DomainStatus data={dateFilteredDomains} onDeleteSuccess={fetchDomains} />
          </>
        ) : (
          <div className="rounded-xl border bg-white shadow-sm overflow-x-auto max-h-130 overflow-y-auto">
            <div className="mb-3 flex items-center justify-between">
              <button
                onClick={() => {
                  setBulkMode(prev => !prev);
                  setSelectedDomains([]);
                }}
                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 cursor-pointer"
              >
                {bulkMode ? 'Cancel bulk actions' : 'Bulk actions'}
              </button>

              {bulkMode && selectedDomains.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setBulkAction({ type: 'hide', value: true });
                      setConfirmOpen(true);
                    }}
                    className="px-3 py-1 text-xs bg-slate-700 text-white rounded"
                  >
                    Hide
                  </button>

                  <button
                    onClick={() => {
                      setBulkAction({ type: 'hide', value: false });
                      setConfirmOpen(true);
                    }}
                    className="px-3 py-1 text-xs bg-slate-500 text-white rounded"
                  >
                    Unhide
                  </button>

                  <button
                    onClick={() => {
                      setBulkAction({ type: 'chat', value: true });
                      setConfirmOpen(true);
                    }}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                  >
                    Enable Chat
                  </button>

                  <button
                    onClick={() => {
                      setBulkAction({ type: 'chat', value: false });
                      setConfirmOpen(true);
                    }}
                    className="px-3 py-1 text-xs bg-blue-400 text-white rounded"
                  >
                    Disable Chat
                  </button>

                  <button
                    onClick={() => {
                      setBulkAction({ type: 'delete' });
                      setConfirmOpen(true);
                    }}
                    className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <table className="min-w-full border-separate border-spacing-y-1">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs font-semibold text-slate-600 tracking-wide">
                  {bulkMode && (
                    <th className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="h-4 w-4"
                      />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-center">Visibility</th>
                  <th className="px-4 py-3 text-center">Chat</th>
                  <th className="px-4 py-3 text-center">Notification</th>
                  <th className="px-4 py-3 text-center">Delete</th>
                  <th className="px-4 py-3 text-center">Added On</th>
                </tr>
              </thead>
              <tbody>
                {searchedDomains
                  .filter((d) => d.status === 'Pass')
                  .map((d) => (
                    <tr key={d.id} className="bg-slate-50 hover:bg-blue-50">
                      {bulkMode && (
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected(d.id)}
                            onChange={() => toggleRow(d)}
                            className="h-4 w-4"
                          />
                        </td>
                      )}

                      <td className="px-4 py-2 text-blue-600 break-all">
                        {d.finalUrl ? (
                          <Link href={d.finalUrl} target="_blank" className="hover:underline">
                            {d.domain}
                          </Link>
                        ) : (
                          d.domain
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
                        <Toggle
                          id={`notify-${d.id}`}
                          checked={d.isMessageNotificationEnabled}
                          onChange={(val) => toggleNotification(d.id, val)}
                        />
                      </td>


                      <td className="px-4 py-2 text-center">
                        <button
                          disabled={bulkMode}
                          onClick={() => {
                            setSelectedDomains([d]);
                            setBulkAction({ type: 'delete' });
                            setConfirmOpen(true);
                          }}
                          className={`text-xs ${bulkMode
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:underline'
                            }`}
                        >
                          Delete
                        </button>

                      </td>
                      <td className="px-4 py-2 text-xs text-center">
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
      <ActionConfirmation
        open={confirmOpen}
        title={
          bulkAction?.type === 'delete'
            ? 'Delete domains'
            : bulkAction?.type === 'hide'
              ? bulkAction.value
                ? 'Hide domains'
                : 'Unhide domains'
              : bulkAction?.type === 'chat'
                ? bulkAction.value
                  ? 'Enable chat'
                  : 'Disable chat'
                : ''
        }
        description={
          bulkAction?.type === 'delete'
            ? `Are you sure you want to delete ${selectedDomains.length} domain(s)?\nThis action cannot be undone.`
            : bulkAction?.type === 'hide'
              ? bulkAction.value
                ? 'Hidden domains will not appear publicly.\nYou can unhide them later.'
                : 'These domains will become visible.'
              : bulkAction?.type === 'chat'
                ? bulkAction.value
                  ? 'Chat will be enabled for selected domains.\nBuyers can contact you.'
                  : 'Chat will be disabled for selected domains.'
                : ''
        }
        confirmText={
          bulkAction?.type === 'delete'
            ? 'Delete'
            : bulkAction?.type === 'hide'
              ? bulkAction.value
                ? 'Hide'
                : 'Unhide'
              : bulkAction?.type === 'chat'
                ? bulkAction.value
                  ? 'Enable'
                  : 'Disable'
                : 'Confirm'
        }
        variant={
          bulkAction?.type === 'delete'
            ? 'danger'
            : bulkAction?.type === 'hide'
              ? 'warning'
              : 'info'
        }
        onCancel={() => {
          setConfirmOpen(false);
          setBulkAction(null);
        }}
        onConfirm={async () => {
          await executeBulkAction();
          setConfirmOpen(false);
          setBulkAction(null);
        }}
      />
    </div>
  );
};

export default Myportfolio;
