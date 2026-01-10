'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import QuickConectCard from '@/components/cards/QuickConectCard';
import Loader from '@/components/Loader';
import Modal from '@/components/model';
import AddDomainsCard from './adddomain';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface DomainType {
  id: string;
  domain: string;
  isHidden: boolean;
  isChatActive: boolean;
  clicks: number;
  finalUrl:string,
  createdAt:string
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
const Myportfolio = () => {
  const [loading, setLoading] = useState(true);
  const [userDomains, setUserDomains] = useState<DomainType[]>([]);
  const [open, setOpen] = useState(false);
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
      const res = await axios.delete(`${API}/${id}`, { withCredentials: true });
      toast.success(res?.data?.message);
    } catch {
      setUserDomains(prev);
    }
  };
  if (loading) return <Loader />;
  return (
    <div className="lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <div className="max-w-5xl mx-auto mt-8">
        <div className="flex justify-between mb-3">
          <button className="rounded-full border px-4 py-1 bg-white shadow">
            Bulk Changes ▼
          </button>

          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-blue-600 text-white px-4 py-1"
          >
            + Add Domain
          </button>

          <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Domains">
            <AddDomainsCard
              onClose={() => {
                setOpen(false);
                fetchDomains();
              }}
            />
          </Modal>
        </div>
        <div className="overflow-x-auto max-h-125 overflow-y-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead className="sticky top-0 z-10 bg-white/30 backdrop-blur-md">
              <tr>
                <th className="px-4 py-2 text-left">Domain</th>
                <th className="px-4 py-2 text-center">Hide</th>
                <th className="px-4 py-2 text-center">Chat</th>
                <th className="px-4 py-2 text-center">Delete</th>
                <th className="px-4 py-2 text-center">Added On</th>
              </tr>
            </thead>
            <tbody>
              {userDomains?.map((d) => (
                <tr key={d.id} className="odd:bg-white even:bg-blue-50">
                  <td className="px-4 py-2 text-blue-600 underline break-all">
                    <Link href={d.finalUrl} target={d?.domain}>{d?.domain}</Link>
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
                      onClick={() => deleteDomain(d.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>

                  <td className="px-4 py-2 text-center">
                   {new Date(d?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <QuickConectCard
        title="Stay Updated"
        description="Get news, announcements, and highlighted names when our newsletter launches"
        mainButton="Subscribe Now"
        subButton={false}
      />
    </div>
  );
};

export default Myportfolio;
