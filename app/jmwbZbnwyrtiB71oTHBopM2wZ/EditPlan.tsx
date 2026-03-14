'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SelectedPlan } from "./PlanTable";

interface EditPlanProps {
  selectedPlan: SelectedPlan | null;
  onClose: () => void;
  onSuccess:()=>void;
}

interface PlanEditData {
  planId: string;
  feature: number;
  extendByMonths: number;
}

const EditPlan = ({ selectedPlan, onClose,onSuccess }: EditPlanProps) => {
  const [planData, setPlanData] = useState<PlanEditData>({
    planId: "",
    feature: 0,
    extendByMonths: 0
  });

  // ✅ Load initial values into state
  useEffect(() => {
    if (selectedPlan) {
      setPlanData({
        planId: selectedPlan.planId,
        feature: selectedPlan.features,          
        extendByMonths: 0                        
      });
    }
  }, [selectedPlan]);

  // ✅ Correct change handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPlanData((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const onSubmitHandler = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_apiLink}plan/editplan-admin`,
      planData,
      { withCredentials: true }
    );

    toast.success(res.data.message || "Plan Updated Successfully");
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

  if (!selectedPlan) return null;
  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
        Edit Plan
      </h2>

      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

          {/* ✅ Title (read-only) */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              value={selectedPlan.title}
              readOnly
              className="block w-full px-4 py-2 mt-2 bg-gray-100 border rounded-md"
            />
          </div>

          <div />

          {/* ✅ Feature (editable) */}
          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Allowed Domain Number
            </label>
            <input
              type="number"
              name="feature"
              value={planData.feature}
              onChange={onChangeHandler}
              className="block w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-200">
              Extend Duration (Months)
            </label>
            <input
              type="number"
              name="extendByMonths"
              value={planData.extendByMonths}
              onChange={onChangeHandler}
              className="block w-full px-4 py-2 mt-2 border rounded-md"
            />
          </div>

        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2.5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPlan;
