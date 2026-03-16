"use client";

import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  adminCheck: boolean;
  domainId: string;
  onRequestUpdated: () => void;
}

const ChangeAdminCheckStatus = ({ adminCheck, domainId, onRequestUpdated }: Props) => {

  const handleChange = async (value: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_apiLink}domain/admin/update-admin-check/${domainId}`,
        { adminCheck: value === "Checked" },
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
      <select
        value={adminCheck ? "checked" : "not_checked"}
        onChange={(e) => handleChange(e.target.value)}
        className={`px-3 py-2 rounded-md text-sm font-medium border transition
      focus:outline-none focus:ring-2
      ${adminCheck
            ? "bg-green-100 text-green-700 border-green-300 focus:ring-green-300"
            : "bg-red-100 text-red-700 border-red-300 focus:ring-red-300"
          }
    `}
      >
        <option value="checked" className="text-green-700">
          ✅ Checked
        </option>

        <option value="not_checked" className="text-red-700">
          ❌ Pending
        </option>
      </select>
    </td>
  );
};

export default ChangeAdminCheckStatus;