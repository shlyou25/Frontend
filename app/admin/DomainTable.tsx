'use client';

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from "@/components/model";
import Promotion from "./Promotion";
import { ToastContainer } from "react-toastify";
import { Trash } from "lucide-react";


/* 🔑 TYPES */
export interface DomainItem {
  domain: string;
  createdAt: string;
  domainId: string
  owner: {
    name: string;
    email: string;
  };
}

interface DomainsTableProps {
  data: DomainItem[];
}

/* ✅ COMPONENT */
const DomainsTable = ({ data }: DomainsTableProps) => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [domainPromotion, setDomainPromotion] = useState({
    domain_id: "",
    domain: ''
  })

  /* 🔍 FILTER LOGIC */
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const searchValue = search.toLowerCase();

      const matchesText =
        item.domain.toLowerCase().includes(searchValue) ||
        item.owner.name.toLowerCase().includes(searchValue) ||
        item.owner.email.toLowerCase().includes(searchValue);

      const matchesDate = dateFilter
        ? item.createdAt.slice(0, 10) === dateFilter
        : true;

      return matchesText && matchesDate;
    });
  }, [data, search, dateFilter]);

  /* 📤 EXPORT TO EXCEL */
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
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      {/* HEADER */}
      <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          No Of Domains - {filteredData.length}
        </h2>

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
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="overflow-x-auto max-h-105 overflow-y-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs sticky top-0 z-20">
            <tr>
              <th className="px-6 py-3 text-left">S.No.</th>
              <th className="px-6 py-3 text-left">Domain</th>
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Registered Date</th>
              <th className="px-6 py-3 text-left">Promote</th>
              <th className="px-6 py-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 text-blue-600 font-medium">{item.domain}</td>
                <td className="px-6 py-4">{item.owner.name}</td>
                <td className="px-6 py-4">{item.owner.email}</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    data-id="ITEM_ID"
                    onClick={() => {
                      setOpen(true)
                      setDomainPromotion({
                        domain_id: item.domainId,
                        domain: item.domain
                      })
                    }}
                  >
                    Promote
                  </button>
                </td>
                 <td className="px-6 py-4">
                  <Trash className="cursor-pointer hover:text-red-400" />
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
      <ToastContainer />
    </div>
  );
}
export default DomainsTable;