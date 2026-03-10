'use client';

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from "../../components/model";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { PlanRequestItem } from "./page";
import { Trash2 } from "lucide-react";
import Confirmation from "../../components/Confirmation";



interface PlanRequestTableProps {
  data: PlanRequestItem[];
  total: number;
  pendingCount: number;
  onRequestUpdated: () => void;
  onRequestUpdatedDomain: () => void;
}


const PlanRequestTable = ({ data, onRequestUpdated, onRequestUpdatedDomain }: PlanRequestTableProps) => {
  console.log(data, 'hhhhhh');

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PlanRequestItem | null>(null);
  const [loaderStatus, setLoaderStatus] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [domainCount, setDomainCount] = useState("");
  const [pendingApproval, setPendingApproval] = useState<{
    userId: string;
    domains: string;
  } | null>(null);


  const approvePlan = async (
    userId: string, domains: string
  ) => {
    if (loaderStatus) return;
    setLoaderStatus(true);
    const payload = {
      userId,
      domains
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}planrequest/approveplanrequest`,
        payload,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      onRequestUpdated();
      onRequestUpdatedDomain();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoaderStatus(false);
    }
  };
  const rejectPlan = async (
    userId: string, domains: string
  ) => {
    if (loaderStatus) return;
    setLoaderStatus(true);
    const payload = {
      userId,
      domains
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}planrequest/rejectplanrequest`,
        payload,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      onRequestUpdated();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoaderStatus(false); // ✅ ALWAYS turn off loader
    }
  };
  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_apiLink}planrequest/${deleteId}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      onRequestUpdated();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const searchValue = search?.toLowerCase();
      const matchesText =
        item.userId.name?.toLowerCase().includes(searchValue) ||
        item.userId.email?.toLowerCase().includes(searchValue) ||
        item.sellerType?.toLowerCase().includes(searchValue);
      const matchesDate = dateFilter
        ? item.createdAt.slice(0, 10) === dateFilter
        : true;
      return matchesText && matchesDate;
    });
  }, [data, search, dateFilter]);

  const exportToExcel = () => {
    const sheetData = filteredData.map((item, index) => ({
      "S.No": index + 1,
      UserName: item.userId.name,
      Email: item.userId.email,
      DomainsRequested: item.domains,
      SellerType: item.sellerType,
      Marketplace: item.marketplace,
      Portfolio: item.portfolio,
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
  const confirmDomainApproval = () => {
    if (!pendingApproval) return;

    approvePlan(pendingApproval.userId, domainCount);

    setDomainModalOpen(false);
    setDomainCount("");
    setPendingApproval(null);
  };


  if (loaderStatus) return <Loader />
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
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Domains</th>
              <th className="px-6 py-3 text-left">Marketplace</th>
              <th className="px-6 py-3 text-left">Seller Type</th>
              <th className="px-6 py-3 text-left">portfolio</th>

              <th className="px-6 py-3 text-left">comments</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Requested On</th>
              {filteredData.some(item => item.status === "Pending") && (
                <th className="px-6 py-3 text-left">Action</th>
              )}
              <th className="px-6 py-3 text-left">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredData.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{item?.userId.name}</td>
                <td className="px-6 py-4">{item?.userId?.email}</td>
                <td className="px-6 py-4">{item?.userId?.phoneNumber}</td>
                <td className="px-6 py-4">{item.domains}</td>
                <td className="px-6 py-4">{item.marketplace}</td>
                <td className="px-6 py-4">{item.sellerType}</td>
                <td className="px-6 py-4">{item.portfolio}</td>
                <td className="px-6 py-4">{item.comments}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${item.status === "Pending"
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
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                {item.status === "Pending" && (
                  <td className="px-6 py-4">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => {
                          if (item.domains === "5000+") {
                            setPendingApproval({
                              userId: item.userId._id,
                              domains: item.domains
                            });
                            setDomainModalOpen(true);
                          } else {
                            approvePlan(item.userId._id, item.domains);
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md
        bg-green-100 text-green-700 hover:bg-green-200
        transition w-full sm:w-auto"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => rejectPlan(item.userId._id, item.domains)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md
        bg-red-100 text-red-700 hover:bg-red-200
        transition w-full sm:w-auto"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 cursor-pointer">
                  <Trash2
                    className="w-5 h-5 cursor-pointer hover:text-red-500"
                    onClick={() => {
                      setDeleteId(item._id);
                      setIsConfirmOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Plan Request"
      >
        <pre className="text-xs">
          {JSON.stringify(selectedRequest, null, 2)}
        </pre>
      </Modal>
      <Modal
        isOpen={domainModalOpen}
        onClose={() => setDomainModalOpen(false)}
        title="Assign Domains"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            Enter number of domains to assign
          </p>

          <input
            type="number"
            placeholder="Enter domain count"
            value={domainCount}
            onChange={(e) => setDomainCount(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDomainModalOpen(false)}
              className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={confirmDomainApproval}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <Confirmation
        open={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete} // ✅ FUNCTION REFERENCE
      />
    </div>
  );
};

export default PlanRequestTable;
