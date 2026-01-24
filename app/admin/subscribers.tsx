'use client';

import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";

/* ---------------- TYPES ---------------- */
interface Subscriber {
  _id: string;
  email: string;
  userId?: string | null;
  createdAt: string;
}

type FilterType = "all" | "registered" | "guest";

/* ---------------- COMPONENT ---------------- */
const Subscribers = () => {
  const [data, setData] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");

  /* ---------------- FETCH SUBSCRIBERS ---------------- */
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_apiLink}subscribe/getallsubscriber`,
        { withCredentials: true }
      );

      if (res.data?.success) {
        setData(res.data.data);
      } else {
        toast.error("Failed to fetch subscribers");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error fetching subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  /* ---------------- COUNTS ---------------- */
  const counts = useMemo(() => {
    return {
      total: data.length,
      registered: data.filter((d) => d.userId).length,
      guest: data.filter((d) => !d.userId).length,
    };
  }, [data]);

  /* ---------------- FILTERED DATA ---------------- */
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.email.toLowerCase().includes(searchValue);

      const matchesDate = dateFilter
        ? item.createdAt.slice(0, 10) === dateFilter
        : true;

      const matchesType =
        filterType === "all"
          ? true
          : filterType === "registered"
          ? !!item.userId
          : !item.userId;

      return matchesSearch && matchesDate && matchesType;
    });
  }, [data, search, dateFilter, filterType]);

  /* ---------------- EXPORT TO EXCEL ---------------- */
  const exportToExcel = () => {
    const sheetData = filteredData.map((item, index) => ({
      "#": index + 1,
      Email: item.email,
      Type: item.userId ? "Registered User" : "Guest",
      SubscribedAt: new Date(item.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "subscribers.xlsx"
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      {/* HEADER */}
      <div className="p-4 border-b space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Subscribers - {filteredData.length}
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2">
          {[
            { key: "all", label: `All (${counts.total})` },
            { key: "registered", label: `Registered (${counts.registered})` },
            { key: "guest", label: `Guests (${counts.guest})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key as FilterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border
                ${
                  filterType === tab.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto max-h-105 overflow-y-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left">S.No.</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">User Type</th>
              <th className="px-6 py-3 text-left">Subscribed Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center">
                  Loading subscribers...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center">
                  No subscribers found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    {item.userId ? (
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                        Registered
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">
                        Guest
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscribers;
