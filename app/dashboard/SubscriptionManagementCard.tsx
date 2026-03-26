"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../components/model";
import Pricing from "../../utils/Plan";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Layers,
  Activity,
  AlertTriangle,
} from "lucide-react";

export const getUserPlan = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_apiLink}plan/getplanbyuser`,
      { withCredentials: true }
    );

    return res?.data?.currentPlan || null;
  } catch {
    return null;
  }
};

const SubscriptionManagementCard = () => {
  const [planInfo, setPlanInfo] = useState<any>(null);
  const router = useRouter();
  const [warningOpen, setWarningOpen] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      const plan = await getUserPlan();
      setPlanInfo(plan);
    };
    fetchPlan();
  }, []);

  if (!planInfo) return null;

  const usagePercent =
    (planInfo.domainsUsed / planInfo.feature) * 100;

  const daysLeft = Math.ceil(
    (new Date(planInfo.endingDate).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-100 mb-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Active Plan
            </h2>
            <p className="text-sm text-gray-500">
              Manage your subscription & usage
            </p>
          </div>

          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
            {planInfo.title}
          </span>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Left */}
          <div className="space-y-5">

            {/* Dates */}
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Start Date</p>
                <p className="text-sm font-medium">
                  {new Date(planInfo.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Expires On</p>
                <p className="text-sm font-medium">
                  {new Date(planInfo.endingDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Days left */}
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-orange-500" />
              <p className="text-sm font-medium text-orange-600">
                {daysLeft} days remaining
              </p>
            </div>

          </div>

          {/* Right */}
          <div className="space-y-5">

            {/* Usage */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2 text-gray-600">
                  <Layers size={16} />
                  Domains Usage
                </span>
                <span className="font-medium">
                  {planInfo.domainsUsed} / {planInfo.feature}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    usagePercent > 80
                      ? "bg-red-500"
                      : usagePercent > 60
                      ? "bg-yellow-500"
                      : "bg-blue-600"
                  }`}
                  style={{ width: `${usagePercent}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {planInfo.remainingDomains} domains remaining
              </p>
            </div>

            {/* Action */}
            <button
              onClick={() => setWarningOpen(true)}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2 font-medium transition"
            >
              Change Plan
            </button>

          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={warningOpen}
        onClose={() => setWarningOpen(false)}
        title="Active Plan Detected"
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-gray-700">
            You already have an active plan. Contact support to modify it.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setWarningOpen(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                setWarningOpen(false);
                router.push("/contact");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Contact
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubscriptionManagementCard;