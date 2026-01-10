'use client';

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from "@/components/model";

/* ================= TYPES ================= */

export interface PlanRequestItem {
  _id: string;
  userId: {
    _id: string;
    email: string;
    name: string;
    phoneNumber: string;
  };
  planTitle: string;
  price: number;
  per: "Month" | "Year";
  featureLimit: number;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  updatedAt: string;
}

interface PlanRequestTableProps {
  data: PlanRequestItem[];
  onRequestUpdated: () => void;
}

/* ================= COMPONENT ================= */

const PlanRequestTable = ({ data, onRequestUpdated }: PlanRequestTableProps) => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PlanRequestItem | null>(null);

  /* 🔍 FILTER */
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const searchValue = search?.toLowerCase();

      const matchesText =
        item.userId.name?.toLowerCase().includes(searchValue) ||
        item.userId.email?.toLowerCase().includes(searchValue) ||
        item.planTitle?.toLowerCase().includes(searchValue);

      const matchesDate = dateFilter
        ? item.createdAt.slice(0, 10) === dateFilter
        : true;

      return matchesText && matchesDate;
    });
  }, [data, search, dateFilter]);

  /* 📤 EXPORT */
  const exportToExcel = () => {
    const sheetData = filteredData.map((item, index) => ({
      "S.No": index + 1,
      UserName: item.userId.name,
      Email: item.userId.email,
      PlanName: item.planTitle,
      Price: item.price,
      Period: item.per,
      DomainsAllowed: item.featureLimit,
      Status: item.status,
      RequestedOn: new Date(item.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PlanRequests");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "PlanRequests.xlsx"
    );
  };
  console.log(data,"PlanReuest");
  
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      {/* HEADER */}
      <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          No Of Plan Requests - {filteredData.length}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search name / email / plan"
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
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto max-h-105 overflow-y-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs sticky top-0 z-20">
            <tr>
              <th className="px-6 py-3 text-left">S.No.</th>
              <th className="px-6 py-3 text-left">Plan</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Period</th>
              <th className="px-6 py-3 text-left">Domains</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Requested On</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredData.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{item.planTitle}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.per}</td>
                <td className="px-6 py-4">{item.featureLimit}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4">{item.userId.name}</td>
                <td className="px-6 py-4">{item.userId.email}</td>
                <td className="px-6 py-4">{item.userId.phoneNumber}</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => {
                    setOpen(true);
                    setSelectedRequest(item);
                  }}
                >
                  <span className="text-blue-600 hover:underline">
                    View
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL PLACEHOLDER */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Plan Request"
      >
        {/* You can plug Approve / Reject UI here */}
        <pre className="text-xs">
          {JSON.stringify(selectedRequest, null, 2)}
        </pre>
      </Modal>
    </div>
  );
};

export default PlanRequestTable;
