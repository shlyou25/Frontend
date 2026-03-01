"use client";

import Confirmation from "../../components/Confirmation";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";

type Domain = {
  id: string;
  domain: string;
  status: string;
  createdAt: string;
};
interface DomainTableProps {
  data: Domain[];
  onDeleteSuccess: () => void;
}


const DomainStatus = ({ data, onDeleteSuccess }: DomainTableProps) => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Domain[]>([]);


  const filteredData = useMemo(() => {
    return statusFilter === "All"
      ? data
      : data.filter((d) => d.status === statusFilter);
  }, [data, statusFilter]);
  const isSelected = (id: string) =>
    selectedDomains.some((d) => d.id === id);

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


  const toggleRow = (domain: Domain) => {
    setSelectedDomains((prev) =>
      prev.some((d) => d.id === domain.id)
        ? prev.filter((d) => d.id !== domain.id)
        : [...prev, domain]
    );
  };


  const deleteHandler = async (domains: Domain[]) => {
    if (!domains.length) return;

    const ids = domains.map((d) => d.id);

    try {
      const endpoint =
        ids.length === 1
          ? `${process.env.NEXT_PUBLIC_apiLink}domain/${ids[0]}`
          : `${process.env.NEXT_PUBLIC_apiLink}domain/bulk-delete`;

      await axios.delete(endpoint, {
        data: ids.length > 1 ? { ids } : undefined,
        withCredentials: true,
      });

      setSelectedDomains([]);
      setBulkMode(false);

      toast.success(
        ids.length === 1
          ? "Domain deleted successfully"
          : `${ids.length} domain(s) deleted`
      );

      onDeleteSuccess();
    } catch (error: any) {
      console.error("Delete failed:", error);
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      {/* Top controls */}
      <div className="p-4 border-b flex items-center justify-between gap-4">

        <button
          onClick={() => {
            setBulkMode((prev) => !prev);
            setSelectedDomains([]); // clear stale selections
          }}
          className={`px-4 py-2 text-sm rounded-md border transition hover:cursor-pointer
    ${bulkMode
              ? "bg-gray-100 border-gray-300"
              : "bg-white border-gray-300 hover:bg-gray-50"
            }
  `}
        >
          {bulkMode ? "Cancel bulk Delete" : "Bulk Delete"}
        </button>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            Filter by status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
            <option value="Manual Review">Manual Review</option>
          </select>
        </div>
      </div>
      {bulkMode && selectedDomains && (
        <div className="px-4 py-3 border-b bg-red-50 flex items-center justify-between">
          <span className="text-sm text-red-700">
            {selectedDomains.length} selected
          </span>
          <button
            onClick={() => {
              setPendingDelete(selectedDomains);
              setConfirmOpen(true);
            }}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete selected
          </button>

        </div>
      )}
      {/* Table */}
      <div className="relative max-h-105 overflow-y-auto">
        <table className="w-full text-left table-auto min-w-max">
          <thead className="sticky top-0 z-20 bg-gray-300 border-b border-gray-200 shadow-sm uppercase">
            <tr>
              {bulkMode && (
                <th className="p-4 border-b w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4"
                  />

                </th>
              )}
              <th className="p-4 border-b text-sm font-medium text-gray-700">
                Domain Name
              </th>
              <th className="p-4 border-b text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="p-4 border-b text-sm font-medium text-gray-700">
                Added On
              </th>
              <th className="p-4 border-b text-sm font-medium text-gray-700">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length ? (
              filteredData.map((domain) => (
                <tr
                  key={domain.id}
                  className="hover:bg-gray-50 transition"
                >
                  {bulkMode && (
                    <td className="p-4 border-b">
                      <input
                        type="checkbox"
                        checked={isSelected(domain.id)}
                        onChange={() => toggleRow(domain)}
                        className="h-4 w-4"
                      />

                    </td>
                  )}
                  <td className="p-4 border-b text-sm text-gray-900">
                    {domain.domain}
                  </td>
                  <td className="p-4 border-b text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${domain.status === "Pass"
                          ? "bg-green-100 text-green-700"
                          : domain.status === "Fail"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {domain.status}
                    </span>
                  </td>
                  <td className="p-4 border-b text-sm text-gray-700">
                    {new Date(domain.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 border-b text-sm text-gray-900">
                    <Trash2
                      onClick={() => {
                        if (domain.status === "Pass") return; // hard stop
                        setPendingDelete([domain]);
                        setConfirmOpen(true);
                      }}
                      className={`
      ${domain.status === "Pass"
                          ? "text-gray-400  opacity-50 cursor-not-allowed"
                          : "text-red-600 hover:text-red-700 cursor-pointer"
                        }`}
                    />
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={bulkMode ? 4 : 3}
                  className="p-6 text-center text-sm text-gray-500"
                >
                  No domains found
                </td>

              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Confirmation
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingDelete([]);
        }}
        onConfirm={async () => {
          await deleteHandler(pendingDelete);
          setConfirmOpen(false);
          setPendingDelete([]);
        }}
      />
    </div>
  );
};

export default DomainStatus;
