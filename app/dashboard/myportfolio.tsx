'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '../../components/Loader';
import Modal from '../../components/model';
import AddDomainsCard from './adddomain';
import { toast } from 'react-toastify';
import Link from 'next/link';
import DomainStatus from './DomainStatus';
import Subscribe from '../../utils/subscribe';
import ActionConfirmation from './ActionConfirmation';
import SearchBox from '@/utils/SearchBox';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Calendar,
  Eye,
  EyeOff,
  MessageSquare,
  MessageSquareOff,
  UserX,
  UserCheck,
  BellOff,
  Bell,
  Trash2
} from "lucide-react";


type DateRange = 'all' | 'today' | '7days' | '30days' | 'custom';

export interface DomainType {
  id: string;
  domain: string;
  status: string;
  isHidden: boolean;
  isChatActive: boolean;
  isMessageNotificationEnabled: boolean;
  isUserNameVisible: boolean;
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
  <label
    htmlFor={id}
    className="relative inline-flex items-center cursor-pointer select-none"
  >
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only peer"
    />

    {/* Track */}
    <div
      className="
        w-11 h-6 rounded-full transition-colors duration-200
        bg-slate-300
        peer-checked:bg-emerald-500
        peer-focus:ring-2 peer-focus:ring-emerald-300
      "
    />

    {/* Thumb */}
    <div
      className="
        absolute left-0.5 top-0.5
        w-5 h-5 bg-white rounded-full shadow-sm
        transition-transform duration-200
        peer-checked:translate-x-5
      "
    />
  </label>
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
    | { type: 'username'; value: boolean }
    | { type: 'notification'; value: boolean }
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
  const toggleUserName = async (id: string, value: boolean) => {
    const prev = [...userDomains];

    setUserDomains((d) =>
      d.map((x) =>
        x.id === id ? { ...x, isUserNameVisible: value } : x
      )
    );

    try {
      const res = await axios.patch(
        `${API}/${id}/toggle-username`, // ✅ your backend route
        {},
        { withCredentials: true }
      );

      toast.success(res?.data?.message);
    } catch {
      setUserDomains(prev); // rollback
      toast.error("Failed to update username visibility");
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
      // ✅ Username visibility bulk
      if (bulkAction.type === 'username') {
        setUserDomains(d =>
          d.map(x =>
            ids.includes(x.id)
              ? { ...x, isUserNameVisible: bulkAction.value }
              : x
          )
        );

        await axios.patch(
          `${API}/bulk-toggle-username`,
          { ids, value: bulkAction.value },
          { withCredentials: true }
        );

        toast.success(
          bulkAction.value ? 'Username shown' : 'Username hidden'
        );
      }

      if (bulkAction.type === 'notification') {
        setUserDomains(d =>
          d.map(x =>
            ids.includes(x.id)
              ? { ...x, isMessageNotificationEnabled: bulkAction.value }
              : x
          )
        );

        await axios.patch(
          `${API}/bulk-toggle-message-notification`,
          { ids, value: bulkAction.value },
          { withCredentials: true }
        );

        toast.success(
          bulkAction.value
            ? 'Email notification enabled'
            : 'Email notification disabled'
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
  const exportMyDomainsToExcel = () => {
    const exportData = searchedDomains
      .filter((d) => d.status === "Pass")
      .map((d, index) => ({
        "S.No.": index + 1,
        Domain: d.domain,
        Visibility: d.isHidden ? "Hidden" : "Visible",
        Chat: d.isChatActive ? "Enabled" : "Disabled",
        Notification: d.isMessageNotificationEnabled ? "Enabled" : "Disabled",
        "Added On": new Date(d.createdAt).toLocaleDateString(),
        FinalURL: d.finalUrl ?? "",
      }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "My Domains");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "my-domains.xlsx"
    );
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
          {/* Left Toggle */}
          <button
            onClick={() => setDomainStatus(false)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
    border cursor-pointer
    ${!domainStatus
                ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900'
              }`}
          >
            My Domains
          </button>
          <div className="flex-1 flex justify-center">
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="inline-flex items-center bg-slate-100 rounded-full p-1.5 gap-1.5 shadow-sm">
            <button
              onClick={() => setDomainStatus(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer
      ${domainStatus
                  ? 'bg-white shadow-md text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                }`}
            >
              Upload Status
            </button>

            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 rounded-full text-sm font-semibold
      bg-blue-600 text-white hover:bg-blue-700
      shadow-md hover:shadow-lg
      transition-all duration-200 cursor-pointer"
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
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setBulkMode(prev => !prev);
                    setSelectedDomains([]);
                  }}
                  className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  {bulkMode ? 'Cancel bulk actions' : 'Bulk actions'}
                </button>

                <button
                  onClick={exportMyDomainsToExcel}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Export Excel
                </button>
              </div>
            </div>
            {bulkMode && (
              <div className="px-4 pb-3 border-b bg-slate-50/60">
                <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">

                  {/* selected count */}
                  <div className="flex items-center gap-2 mr-2 shrink-0">
                    <div className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-semibold">
                      {selectedDomains.length}
                    </div>
                    <span className="text-xs text-slate-600 whitespace-nowrap">
                      selected
                    </span>
                  </div>

                  {/* Hide */}
                  <button
                    onClick={() => {
                      setBulkAction({ type: 'hide', value: true });
                      setConfirmOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg
        bg-slate-100 text-slate-700 text-xs font-medium
        hover:bg-slate-200 transition whitespace-nowrap shrink-0"
                  >
                    <EyeOff size={14} />
                    Hide
                  </button>

                  <button
                    onClick={() => {
                      setBulkAction({ type: 'hide', value: false });
                      setConfirmOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg
        bg-slate-100 text-slate-700 text-xs font-medium
        hover:bg-slate-200 transition whitespace-nowrap shrink-0"
                  >
                    <Eye size={14} />
                    Unhide
                  </button>

                  {/* Chat */}
                  <button
                    onClick={() => {
                      setBulkAction({ type: 'chat', value: true });
                      setConfirmOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg
        bg-blue-600 text-white text-xs font-medium
        hover:bg-blue-700 transition whitespace-nowrap shrink-0"
                  >
                    <MessageSquare size={14} />
                    Enable Chat
                  </button>

                  <button
                    onClick={() => {
                      setBulkAction({ type: 'chat', value: false });
                      setConfirmOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg
        bg-slate-100 text-slate-700 text-xs font-medium
        hover:bg-slate-200 transition whitespace-nowrap shrink-0"
                  >
                    <MessageSquareOff size={14} />
                    Disable Chat
                  </button>

                  {/* Username */}
                  <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition whitespace-nowrap shrink-0"
                    onClick={() => {
                      setBulkAction({ type: 'username', value: false });
                      setConfirmOpen(true);
                    }}
                  >
                    <UserX size={14} />
                    Hide Username
                  </button>

                  <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition whitespace-nowrap shrink-0"
                    onClick={() => {
                      setBulkAction({ type: 'username', value: true });
                      setConfirmOpen(true);
                    }}
                  >
                    <UserCheck size={14} />
                    Unhide Username
                  </button>
                  <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition whitespace-nowrap shrink-0"
                    onClick={() => {
                      setBulkAction({ type: 'notification', value: false });
                      setConfirmOpen(true);
                    }}
                  >
                    <BellOff size={14} />
                    Disable Email Notification
                  </button>

                  <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition whitespace-nowrap shrink-0"
                    onClick={() => {
                      setBulkAction({ type: 'notification', value: true });
                      setConfirmOpen(true);
                    }}
                  >
                    <Bell size={14} />
                    Enable Email Notification
                  </button>

                  {/* Delete */}
                  <div className="ml-auto shrink-0">
                    <button
                      onClick={() => {
                        setBulkAction({ type: 'delete' });
                        setConfirmOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg
          bg-red-600 text-white text-xs font-semibold
          hover:bg-red-700 transition whitespace-nowrap"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            <table className="min-w-full border-separate border-spacing-y-1">
              <thead className="sticky top-0 bg-white">
                <tr className="text-xs font-semibold text-slate-600 tracking-wide">

                  {/* ✅ Select all checkbox */}
                  {bulkMode && (
                    <th className="px-4 py-3 text-center w-10">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-slate-300 cursor-pointer"
                      />
                    </th>
                  )}

                  <th className="px-4 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-center">Visibility</th>
                  <th className="px-4 py-3 text-center">Chat</th>
                  <th className="px-4 py-3 text-center">Notification</th>
                  <th className="px-4 py-3 text-center">Username</th>
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
                        <td className="px-4 py-2 text-center w-10">
                          <input
                            type="checkbox"
                            checked={isSelected(d.id)}
                            onChange={() => toggleRow(d)}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer"
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
                          checked={!d.isHidden}
                          onChange={(val) => toggleHide(d.id, !val)}
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
                        <Toggle
                          id={`username-${d.id}`}
                          checked={d.isUserNameVisible}
                          onChange={(val) => toggleUserName(d.id, val)}
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

        <Subscribe buttonText="Subscribe" heading="Stay Updated" text="Subscribe to newsletter" />
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
                : bulkAction?.type === 'username'
                  ? bulkAction.value
                    ? 'Show usernames'
                    : 'Hide usernames'
                  : bulkAction?.type === 'notification'
                    ? bulkAction.value
                      ? 'Enable email notifications'
                      : 'Disable email notifications'
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
                : bulkAction?.type === 'username'
                  ? bulkAction.value
                    ? 'Usernames will be visible to buyers.'
                    : 'Usernames will be hidden from buyers.'
                  : bulkAction?.type === 'notification'
                    ? bulkAction.value
                      ? 'Email notifications will be enabled.'
                      : 'Email notifications will be disabled.'
                    : ''
        }
        confirmText={
          bulkAction?.type === 'delete'
            ? 'Delete'
            : bulkAction?.type === 'hide'
              ? bulkAction.value ? 'Hide' : 'Unhide'
              : bulkAction?.type === 'chat'
                ? bulkAction.value ? 'Enable' : 'Disable'
                : bulkAction?.type === 'username'
                  ? bulkAction.value ? 'Show' : 'Hide'
                  : bulkAction?.type === 'notification'
                    ? bulkAction.value ? 'Enable' : 'Disable'
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
