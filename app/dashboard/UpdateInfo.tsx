import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUserData } from "./profile";
import { Lock } from "lucide-react";

interface UpdateInfoProps extends backendUserData {
  setUpdateInfoStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

const UpdateInfo = ({ setUpdateInfoStatus, ...props }: UpdateInfoProps) => {
  const [data, setData] = useState<backendUserData>(props);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "phoneNumber" && value && !PHONE_REGEX.test(value)) {
      setError("Use international format (e.g. +91XXXXXXXXXX)");
    } else {
      setError(null);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_apiLink}user/updateuserinfo`,
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setUpdateInfoStatus(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5"> 
      <Field
        label="Name"
        name="name"
        value={data.name ?? ""}
        onChange={onChange}
      />
      <Field
        label="User Name"
        name="userName"
        value={data.userName ?? ""}
        onChange={onChange}
      />

      <Field
        label="Primary Email"
        value={data.email ?? ""}
        disabled
        hint="Used for login"
        badge={
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            <Lock size={12} /> Locked
          </span>
        }
      />

      <Field
        label="Phone Number"
        name="phoneNumber"
        value={data.phoneNumber ?? ""}
        onChange={onChange}
        error={error}
        hint="Include country code"
      />
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setUpdateInfoStatus(false)}
          className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string | null;
  badge?: React.ReactNode;
}

const Field = ({ label, hint, error, badge, ...props }: FieldProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {badge && <span>{badge}</span>}
      </div>

      <input
        {...props}
        className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        } ${props.disabled ? "bg-gray-100 text-gray-500" : ""}`}
      />

      {hint && !error && (
        <p className="mt-1 text-xs text-gray-400">{hint}</p>
      )}

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default UpdateInfo;
