'use client';

import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { UserInterface } from "./page";
import axios from "axios";
import Modal from "../../components/model";
import AddPlan from "./AddPlan";

interface UserTableProps {
    data: UserInterface[];
    onRefresh: () => void;
}
export interface SelectedUser {
    userId: string;
    email: string
}
/* ✅ COMPONENT */
const UserTable = ({ data, onRefresh }: UserTableProps) => {
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const onChangeHandler = async (_id: string, currentStatus: boolean) => {
        const payload = {
            _id,
            isActive: !currentStatus,
        };
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_apiLink}user/updateuserstatus`,
                payload,
                { withCredentials: true }
            );

            if (res.data?.success) {
                toast.success(
                    `User ${payload.isActive ? "activated" : "deactivated"} successfully`
                );
                onRefresh()
            } else {
                toast.error("Failed to update user status");
            }
        } catch (error: any) {
            console.error("Toggle user status error:", error);
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };
    /* 🔍 FILTER LOGIC */
    const filteredData = useMemo(() => {
        return data.filter(item => {
            const searchValue = search.toLowerCase();

            const matchesText =
                item.email.toLowerCase().includes(searchValue) ||
                item.name?.toLowerCase().includes(searchValue) ||
                item.phoneNumber?.toLowerCase().includes(searchValue);

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
            Name: item?.name || "No Name",
            Email: item.email,
            PhoneNumber: item.phoneNumber,
            status: item?.isActive ? " Active" : "In Active",
            CreatedAt: new Date(item.createdAt).toLocaleDateString(),
        }));
        const worksheet = XLSX.utils.json_to_sheet(sheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        saveAs(
            new Blob([excelBuffer], { type: "application/octet-stream" }),
            "user.xlsx"
        );
    };
    return (
        <div className="bg-white rounded-xl shadow border border-gray-200">
            {/* HEADER */}
            <div className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                    Number Of Users - {filteredData.length}
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search name / email / phoneNumber"
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
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Phone Number</th>
                            <th className="px-6 py-3 text-left">Registered Date</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Change Status</th>
                            <th className="px-6 py-3 text-left">Plan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredData?.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 text-blue-600 font-medium">{item.name || "No Name"}</td>
                                <td className="px-6 py-4">{item.email}</td>
                                <td className="px-6 py-4">{item.phoneNumber}</td>
                                <td className="px-6 py-4">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">{item.isActive ? "Active" : "IN Active"}</td>
                                <td className="px-6 py-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.isActive}
                                            className="sr-only peer"
                                            name="isActive"
                                            onChange={() => onChangeHandler(item._id, item.isActive)}
                                        />
                                        <div
                                            className={`relative w-9 h-5 rounded-full transition-colors
        ${item.isActive ? "bg-green-500" : "bg-red-500"}
        after:content-['']
        after:absolute after:top-0.5 after:left-0.5
        after:h-4 after:w-4 after:bg-white
        after:rounded-full after:transition-all
        ${item.isActive ? "after:translate-x-4" : ""}`}
                                        />
                                    </label>
                                </td>
                                <td
                                    className="px-6 py-4 cursor-pointer"
                                    onClick={() => {
                                        setOpen(true)
                                        setSelectedUser({
                                            userId: item._id,
                                            email: item.email,
                                        })
                                    }}
                                >
                                    <div className="relative inline-flex items-center group">
                                        {/* CONTENT */}
                                        {item.plan?.title ? (
                                            <span>{item.plan.title}</span>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-plus"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="M12 5v14" />
                                            </svg>
                                        )}

                                        {/* TOOLTIP */}
                                        <span
                                            className="
        absolute top-8 left-1/2 -translate-x-1/2
        whitespace-nowrap
        rounded-md bg-gray-800 px-2 py-1
        text-xs text-white
        opacity-0 transition-opacity
        group-hover:opacity-100
        pointer-events-none
      "
                                        >
                                            Change Plan
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Add Plan"
            >
                <AddPlan
                    selectedUser={selectedUser}
                    onClose={() => setOpen(false)}
                />
            </Modal>
        </div>
    );
}
export default UserTable;