'use client';

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from "@/components/model";
import EditPlan from "./EditPlan";

// Single object wrapping the entire response
export interface PlansResponse {
  success: boolean;
  count: number;
  plans: PlanItem[];
}

export interface PlanItem {
  _id: string;
  title: string;
  price: number;
  per: string;
  feature: number;
  startDate: string;
  endingDate: string;
  status: string;
  userId: UserInfo;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface PlanTableProps {
  data: PlanItem[];
  onPlanUpdated: () => void;
}


export interface UserInfo {
  _id: string;
  email: string;
  role: string;
  name: string;
  phoneNumber: string;
}

export interface SelectedPlan {
  planId: string;
  title: string;
  features:number;
  EndingDate:string
}



/* ✅ COMPONENT */
const PlanTable = ({ data, onPlanUpdated }: PlanTableProps) => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  

  /* 🔍 FILTER LOGIC */
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const searchValue = search.toLowerCase();

      const matchesText =
        item.userId.email.toLowerCase().includes(searchValue) ||
        item.userId.name.toLowerCase().includes(searchValue);

      const matchesDate = dateFilter
        ? item.createdAt.slice(0, 10) === dateFilter
        : true;

      return matchesText && matchesDate;
    });
  }, [data, search, dateFilter]);

  /* 📤 EXPORT TO EXCEL */
  const exportToExcel = () => {
    const sheetData = filteredData.map((item, index) => ({
      "S.No": index + 1,
      UserName: item.userId.name,
      Email: item.userId.email,
      PlanName: item.title,
      PlanPrice: item.price,
      StartDate: new Date(item.startDate).toLocaleDateString(),
      EndDate: new Date(item.endingDate).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Plans");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "Plan.xlsx"
    );
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      {/* HEADER */}
      <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          No Of Plans - {filteredData.length}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search name / email"
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
              <th className="px-6 py-3 text-left">Plan Name</th>
              <th className="px-6 py-3 text-left">Plan Price</th>
              <th className="px-6 py-3 text-left">Start Date </th>
              <th className="px-6 py-3 text-left">End Date </th>
              <th className="px-6 py-3 text-left">Domain Allowed</th>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">User Email</th>
              <th className="px-6 py-3 text-left">Contact Number</th>
              <th className="px-6 py-3 text-left">Edit</th>

            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 text-blue-600 font-medium">{item.title}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{new Date(item.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{new Date(item.endingDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{item.feature}</td>
                <td className="px-6 py-4">{item.userId.name}</td>
                <td className="px-6 py-4">{item.userId.email}</td>
                <td className="px-6 py-4">{item.userId.phoneNumber}</td>
                <td className="px-6 py-4"
                  onClick={() => {
                    setOpen(true);
                    setSelectedPlan({
                      planId: item._id,
                      title: item.title,
                      features:item.feature,
                      EndingDate:item.endingDate
                    });
                  }}

                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen cursor-pointer"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Plan"
      >
        <EditPlan
          selectedPlan={selectedPlan}
          onClose={() => setOpen(false)}
          onSuccess={onPlanUpdated}
        />
      </Modal>
    </div>
  );
}
export default PlanTable;