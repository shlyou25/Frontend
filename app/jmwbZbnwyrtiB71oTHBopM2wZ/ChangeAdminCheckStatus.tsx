"use client";

import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle2, Clock } from "lucide-react";

interface Props {
  adminCheck: boolean;
  domainId: string;
  onRequestUpdated: () => void;
}

const ChangeAdminCheckStatus = ({
  adminCheck,
  domainId,
  onRequestUpdated,
}: Props) => {

  const handleChange = async (value: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_apiLink}domain/admin/update-admin-check/${domainId}`,
        { adminCheck: value === "checked" },
        { withCredentials: true }
      );

      toast.success("Admin check status updated");
      onRequestUpdated();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <td className="px-6 py-4">
      <div className="relative inline-block w-full">
        <select
          value={adminCheck ? "checked" : "not_checked"}
          onChange={(e) => handleChange(e.target.value)}
          className={`
            w-full appearance-none
            pl-10 pr-8 py-2.5
            rounded-lg text-sm font-medium
            border transition-all duration-200
            focus:outline-none focus:ring-2
            cursor-pointer

            ${adminCheck
              ? "bg-green-50 text-green-700 border-green-300 focus:ring-green-300"
              : "bg-red-50 text-red-700 border-red-300 focus:ring-red-300"
            }
          `}
        >
          <option value="checked">Checked</option>
          <option value="not_checked">Pending</option>
        </select>

        {/* LEFT ICON */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {adminCheck ? (
            <CheckCircle2 size={16} className="text-green-600" />
          ) : (
            <Clock size={16} className="text-red-500" />
          )}
        </div>

        {/* DROPDOWN ARROW */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          ▾
        </div>
      </div>
    </td>
  );
};

export default ChangeAdminCheckStatus;