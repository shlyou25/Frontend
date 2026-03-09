'use client';

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from "../../components/model";
import Promotion from "./Promotion";
import { Trash } from "lucide-react";
import ChangeDomainStatus from "./ChangeDomainStatus";
import Confirmation from "../../components/Confirmation";
import axios from "axios";
import { toast } from "react-toastify";
import PromotedDomainTable from "./PromotedDomainTable";


export interface DomainItem {
  domainId: string;
  domain: string;
  status: string;
  finalUrl: string | null;
  createdAt: string;
  owner: {
    name: string;
    email: string;
  };
}

interface DomainsTableProps {
  data: DomainItem[];
  onRequestUpdated: () => void;
}

const DomainsTable = ({ data, onRequestUpdated }: DomainsTableProps) => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [domainPromotion, setDomainPromotion] = useState({
    domain_id: "",
    domain: ''
  })
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isPromotedDomain, setIsPromotedDomain] = useState<boolean>(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<DomainItem[]>([]);
  const [pendingBulkDelete, setPendingBulkDelete] = useState<DomainItem[]>([]);

  const openDeleteModal = (domainId: string) => {
    setDeleteId(domainId)
    setIsConfirmOpen(true)
  }
  const handleConfirmDelete = () => {
    if (!deleteId) return
    handleDelete(deleteId)
    setIsConfirmOpen(false)
    setDeleteId(null)
  }
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_apiLink}domain/deletedomain/${deleteId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      onRequestUpdated();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const searchValue = search.toLowerCase();
      const matchesText =
        item.domain.toLowerCase().includes(searchValue) ||
        item.owner?.name?.toLowerCase().includes(searchValue) ||
        item.owner?.email?.toLowerCase().includes(searchValue);

      const matchesDate = dateFilter
        ? item.createdAt.slice(0, 10) === dateFilter
        : true;

      const matchesStatus =
        statusFilter === "all"
          ? true
          : item.status === statusFilter;

      return matchesText && matchesDate && matchesStatus;
    });
  }, [data, search, dateFilter, statusFilter]);
  const isSelected = (id: string) =>
    selectedDomains.some((d) => d.domainId === id);

  const isAllSelected =
    filteredData.length > 0 &&
    selectedDomains.length === filteredData.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedDomains([]);
    } else {
      setSelectedDomains(filteredData);
    }
  };

  const toggleRow = (domain: DomainItem) => {
    setSelectedDomains((prev) =>
      prev.some((d) => d.domainId === domain.domainId)
        ? prev.filter((d) => d.domainId !== domain.domainId)
        : [...prev, domain]
    );
  };
  const handleBulkDelete = async (domains: DomainItem[]) => {
    if (!domains.length) return;
    const ids = domains.map((d) => d.domainId);
    try {
      
      await axios.delete(
        `${process.env.NEXT_PUBLIC_apiLink}domain/admin/domain/bulk-delete`,
        {
          data: { domainIds: ids },
          withCredentials: true,
        }
      );
      toast.success(`${ids.length} domains deleted`);

      setSelectedDomains([]);
      setBulkMode(false);

      onRequestUpdated();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Bulk delete failed");
    }
  };

  const exportToExcel = () => {
    const sheetData = filteredData.map((item, index) => ({
      "#": index + 1,
      Domain: item.domain,
      Owner: item.owner.name,
      Email: item.owner.email,
      CreatedAt: new Date(item.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Domains");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "domains.xlsx"
    );
  };

  if (isPromotedDomain) {
    return (
      <PromotedDomainTable
        setIsPromotedDomain={setIsPromotedDomain}
      />
    );
  }
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          No Of Domains - {filteredData.length}
        </h2>
        <button
          onClick={() => setIsPromotedDomain(!isPromotedDomain)}
          className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2  cursor-pointer
             text-sm font-medium text-gray-700 hover:bg-gray-50 
             transition focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Promoted Domains
        </button>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
          <option value="Manual Review">Manual Review</option>
        </select>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search domain / name / email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              setBulkMode((prev) => !prev);
              setSelectedDomains([]);
            }}
            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            {bulkMode ? "Cancel Bulk Delete" : "Bulk Delete"}
          </button>
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* BULK ACTION BAR */}
      {bulkMode && selectedDomains.length > 0 && (
        <div className="px-4 py-3 border-b bg-red-50 flex items-center justify-between">
          <span className="text-sm text-red-700">
            {selectedDomains.length} selected
          </span>

          <button
            onClick={() => {
              setPendingBulkDelete(selectedDomains);
              setIsConfirmOpen(true);
            }}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}

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
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Staus</th>
              <th className="px-6 py-3 text-left">Registered Date</th>
              <th className="px-6 py-3 text-left">Promote</th>
              <th className="px-6 py-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">

                {bulkMode && (
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected(item.domainId)}
                      onChange={() => toggleRow(item)}
                    />
                  </td>
                )}

                <td className="px-6 py-4">{index + 1}</td>
                
             
                <td className="px-6 py-4 font-medium">
                  {item.finalUrl ? (
                    <a
                      href={item.finalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {item.domain}
                    </a>
                  ) : (
                    <span className="text-gray-800">{item.domain}</span>
                  )}
                </td>
                <td className="px-6 py-4">{item?.owner?.name}</td>
                <td className="px-6 py-4">{item?.owner?.email}</td>
                <ChangeDomainStatus
                  status={item.status}
                  domainId={item.domainId}
                  onRequestUpdated={onRequestUpdated}
                />
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {(() => {
                    const isPass = item.status === "Pass";

                    const tooltipText = isPass
                      ? "Promote domain"
                      : item.status === "Fail"
                        ? "Can't promote: domain failed checks"
                        : "Can't promote: domain under manual review";

                    return (
                      <button
                        disabled={!isPass}
                        title={tooltipText}
                        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-colors
          ${isPass
                            ? "bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70"
                          }
        `}
                        onClick={() => {
                          if (!isPass) return;

                          setOpen(true);
                          setDomainPromotion({
                            domain_id: item.domainId,
                            domain: item.domain
                          });
                        }}
                      >
                        Promote
                      </button>
                    );
                  })()}
                </td>
                <td className="px-6 py-4">
                  <Trash onClick={() => openDeleteModal(item.domainId)} className="cursor-pointer hover:text-red-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Promote Domain"
      >
        <Promotion
          domainPromotion={domainPromotion}
          onClose={() => setOpen(false)}
        />
      </Modal>
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
            handleConfirmDelete(); // existing single delete
          }

          setIsConfirmOpen(false);
        }}
      />
    </div>
  );
}
export default DomainsTable;