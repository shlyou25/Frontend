"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

type PasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

const Page = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<PasswordForm>({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // -----------------------
  // SINGLE ONCHANGE HANDLER
  // -----------------------
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------
  // PASSWORD RULES
  // -----------------------
  const rules = useMemo(() => {
    return {
      uppercase: /[A-Z]/.test(userData.newPassword),
      number: /\d/.test(userData.newPassword),
      length: userData.newPassword.length >= 8,
      match:
        userData.newPassword.length > 0 &&
        userData.newPassword === userData.confirmPassword,
    };
  }, [userData]);

  const allValid =
    rules.uppercase && rules.number && rules.length && rules.match;

  // -----------------------
  // SUBMIT
  // -----------------------
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // 🔒 Frontend guard (extra safety)
  if (!allValid) {
    toast.error("Please fix password requirements");
    return;
  }

  setLoading(true);

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_apiLink}auth/change-password`,
      {
        newPassword: userData.newPassword,
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Password updated successfully. Please login again.");

    // 🔐 Always force fresh login after password change
    router.replace("/login");

  } catch (err: any) {
    // 🔒 Token expired / invalid / user tried direct access
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      toast.error("Session expired. Please login again.");
      router.replace("/login");
      return;
    }

    toast.error(
      err?.response?.data?.message || "Password update failed"
    );
  } finally {
    setLoading(false);
  }
};

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Change Password
        </h1>

        <form className="space-y-6" onSubmit={onSubmitHandler}>
          {/* NEW PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              New Password *
            </label>
            <input
              type="password"
              name="newPassword"
              value={userData.newPassword}
              onChange={onChangeHandler}
              className="block w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Confirm New Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={onChangeHandler}
              className="block w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* RULES */}
          <ul className="text-sm space-y-1">
            <li className={rules.uppercase ? "text-green-600" : "text-red-500"}>
              • At least 1 uppercase letter
            </li>
            <li className={rules.number ? "text-green-600" : "text-red-500"}>
              • At least 1 number
            </li>
            <li className={rules.length ? "text-green-600" : "text-red-500"}>
              • At least 8 characters
            </li>
            <li className={rules.match ? "text-green-600" : "text-red-500"}>
              • Passwords must match
            </li>
          </ul>

          {/* ACTIONS */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={!allValid}
              className={`px-4 py-2 rounded-md text-white ${
                allValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
