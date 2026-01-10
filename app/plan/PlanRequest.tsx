"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface PlanRequestProps {
  onClose: () => void;
}

const plan = [
  { title: "Starter", price: 0.99, per: "Month", feature: 5 },
  { title: "Basic", price: 4.99, per: "Month", feature: 100 },
  { title: "Business", price: 9.99, per: "Month", feature: 500 },
  { title: "Premium", price: 14.99, per: "Month", feature: 1000 },
  { title: "Platinum", price: 19.99, per: "Month", feature: 2000 },
  { title: "Gold", price: 24.99, per: "Month", feature: 5000 },
];

const PlanRequest = ({ onClose }: PlanRequestProps) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!selectedPlan) {
      setError("Please select a plan");
      return;
    }

    try {
      setLoading(true);
     const res= await axios.post(
       `${process.env.NEXT_PUBLIC_apiLink}planrequest/addplanrequest`,
        { planTitle: selectedPlan },
        { withCredentials: true } 
      );
    toast.success(res.data.message);
      onClose();
    } catch (err: any) {
        toast.error(err.response.data.message);
      if (err.response?.status === 401) {
        setError("Please login first to proceed");
      } else if (err.response?.status === 403) {
        setError("Your account is inactive");
      } else {
        setError("Failed to submit plan request");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">
        Please Select a Plan
      </h2>

      <form onSubmit={onSubmitHandler}>
        <div className="mt-4">
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md
            focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          >
            <option value="">Select a plan</option>
            {plan.map((p) => (
              <option key={p.title} value={p.title}>
                {p.title} — ${p.price}/{p.per} ({p.feature} domains)
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-sm border rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-2.5 text-sm text-white rounded-md
              ${loading ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-600"}
            `}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PlanRequest;
