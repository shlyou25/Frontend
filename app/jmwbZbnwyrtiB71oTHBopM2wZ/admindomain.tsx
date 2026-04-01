'use client';

import React, { useEffect, useMemo, useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";
import Confirmation from "../../components/Confirmation";
import Modal from "@/components/model";
import AddDomain from "./AddDomain";

export interface DomainItem {
  domainId: string;
  domain: string;
  status: string;
  finalUrl: string | null;
  createdAt: string;
  sellerName?: string;
  owner: {
    name: string;
    email: string;
  };
}

const AdminDomainTable = () => {
  const [data, setData] = useState<DomainItem[]>([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bulkSeller, setBulkSeller] = useState("");
  

  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<DomainItem[]>([]);
  const [pendingBulkDelete, setPendingBulkDelete] = useState<DomainItem[]>([]);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const [refresh, setRefresh] = useState(0);

  const updateSeller = async (id: string, sellerName: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_apiLink}domain/updateSellerNameAdmin`,
        { id, sellerName },
        { withCredentials: true }
      );
      toast.success("Seller updated");
      setEditingId(null);
      onRequestUpdated();
    } catch {
      toast.error("Failed to update seller");
    }
  };
  const handleBulkSellerUpdate = async () => {
  const ids = selectedDomains.map(d => d.domainId);

  if (ids.length === 0) {
    toast.error("Please select domains");
    return;
  }

  if (!bulkSeller.trim()) {
    toast.error("Enter seller name");
    return;
  }

  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_apiLink}domain/bulk-update-seller`,
      {
        ids,
        sellerName: bulkSeller
      },
      { withCredentials: true }
    );

    toast.success("Seller updated successfully");

    setBulkSeller("");
    setSelectedDomains([]);
    setBulkMode(false);
    onRequestUpdated();

  } catch (error) {
    console.error(error);
    toast.error("Bulk update failed");
  }
};
  const fetchDomains = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_apiLink}domain/getdomainbyuserAdmin`,
        { withCredentials: true }
      );
      setData(res.data.domains || []);
    } catch {
      toast.error("Failed to fetch domains");
    }
  };

  useEffect(() => {
    fetchDomains();
  }, [refresh]);

  const onRequestUpdated = () => setRefresh((p) => p + 1);
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const s = search.toLowerCase();

      const matchesText =
        item.domain.toLowerCase().includes(s) ||
        item.sellerName?.toLowerCase().includes(s) ||
        item.owner?.email?.toLowerCase().includes(s);

      const matchesDate = dateFilter
        ? item.createdAt.slice(0, 10) === dateFilter
        : true;

      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchesText && matchesDate && matchesStatus;
    });
  }, [data, search, dateFilter, statusFilter]);

  const isSelected = (id: string) =>
    selectedDomains.some((d) => d.domainId === id);

  const isAllSelected =
    filteredData.length > 0 &&
    selectedDomains.length === filteredData.length;

  const toggleRow = (domain: DomainItem) => {
    setSelectedDomains((prev) =>
      prev.some((d) => d.domainId === domain.domainId)
        ? prev.filter((d) => d.domainId !== domain.domainId)
        : [...prev, domain]
    );
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedDomains([]);
    } else {
      setSelectedDomains(filteredData);
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_apiLink}domain/deletedomain/${deleteId}`,
        { withCredentials: true }
      );
      toast.success("Deleted");
      onRequestUpdated();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleBulkDelete = async (domains: DomainItem[]) => {
    const ids = domains.map((d) => d.domainId);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_apiLink}domain/bulk-delete`,
        {
          data: { ids },
          withCredentials: true,
        }
      );

      toast.success(`${ids.length} deleted`);
      setSelectedDomains([]);
      setBulkMode(false);
      onRequestUpdated();
    } catch {
      toast.error("Bulk delete failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">

      {/* HEADER */}
      <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-b">

        <h2 className="text-lg font-semibold text-gray-800">
          No Of Domains - {filteredData.length}
        </h2>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="all">All Status</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
        </select>

        <div className="flex flex-col sm:flex-row gap-3">

          <input
            type="text"
            placeholder="Search domain / seller"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          />

          <button
            onClick={() => {
              setBulkMode((prev) => !prev);
              setSelectedDomains([]);
            }}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            {bulkMode ? "Cancel Bulk Action" : "Bulk Action"}
          </button>

          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add Domain
          </button>

        </div>
      </div>

      {/* BULK BAR */}
    {bulkMode && selectedDomains.length > 0 && (
  <div className="px-5 py-3 border-b bg-blue-50 flex items-center justify-between">

    {/* LEFT */}
    <span className="text-sm font-medium text-blue-700">
      {selectedDomains.length} selected
    </span>

    {/* RIGHT ACTIONS */}
    <div className="flex items-center gap-3">

      {/* SELLER INPUT */}
      <input
        type="text"
        placeholder="Enter seller name"
        value={bulkSeller}
        onChange={(e) => setBulkSeller(e.target.value)}
        className="border px-3 py-1 rounded text-sm"
      />

      {/* UPDATE BUTTON */}
      <button
        onClick={handleBulkSellerUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
      >
        Update Seller
      </button>

      {/* DELETE (existing) */}
      <button
        onClick={() => {
          setPendingBulkDelete(selectedDomains);
          setIsConfirmOpen(true);
        }}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
      >
        Delete
      </button>

    </div>

  </div>
)}
      {/* TABLE */}
      <div className="overflow-x-auto max-h-150 overflow-y-auto">
        <table className="min-w-full text-sm border-collapse">

          <thead className="bg-gray-50 text-gray-500 uppercase text-xs sticky top-0 z-20">
            <tr>
              {bulkMode && (
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
              )}
              <th className="px-6 py-3 text-left">S.No.</th>
              <th className="px-6 py-3 text-left">Domain</th>
              <th className="px-6 py-3 text-left">Seller</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Registered Date</th>
              <th className="px-6 py-3 text-left">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredData.map((item, index) => (
              <tr key={item.domainId} className="hover:bg-gray-50 transition">

                {bulkMode && (
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected(item.domainId)}
                      onChange={() => toggleRow(item)}
                    />
                  </td>
                )}

                <td className="px-6 py-4 text-center">{index + 1}</td>

                <td className="px-6 py-4 font-medium">
                  <a
                    href={item.finalUrl ?? `https://${item.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {item.domain}
                  </a>
                </td>

                <td className="px-6 py-4">
                  {editingId === item.domainId ? (
                    <div className="flex items-center gap-2">

                      <input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="border px-2 py-1 rounded text-sm w-32"
                        autoFocus
                      />
                      <button
                        onClick={() => updateSeller(item.domainId, editingValue)}
                        className="p-1 rounded hover:bg-green-100 text-green-600"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      >
                        <X size={16} />
                      </button>

                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">

                      <span className="text-gray-800">
                        {item.sellerName || item.owner.name}
                      </span>
                      <button
                        onClick={() => {
                          setEditingId(item.domainId);
                          setEditingValue(item.sellerName || "");
                        }}
                        className="opacity-0 group-hover:opacity-100 transition p-1 rounded hover:bg-gray-100 text-gray-500 cursor-pointer"
                      >
                        <Pencil size={14} />
                      </button>

                    </div>
                  )}
                </td>

                <td className="px-6 py-4">{item.status}</td>

                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <Trash
                    onClick={() => openDeleteModal(item.domainId)}
                    className="cursor-pointer hover:text-red-400"
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
      {/* MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Domain" position="center">
        <AddDomain
          onClose={() => {
            setOpen(false);
            onRequestUpdated();
          }}
        />
      </Modal>

      {/* CONFIRM */}
      <Confirmation
        open={isConfirmOpen}
        onCancel={() => {
          setIsConfirmOpen(false);
          setPendingBulkDelete([]);
        }}
        onConfirm={async () => {
          if (pendingBulkDelete.length) {
            await handleBulkDelete(pendingBulkDelete);
            setPendingBulkDelete([]);
          } else {
            await handleDelete();
          }
          setIsConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default AdminDomainTable;