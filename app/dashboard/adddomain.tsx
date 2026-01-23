"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import ExcelDropZone from "./ExcelDropZone";
import { downloadDomainTemplate } from "@/utils/downloadDomainTemplate";

const AddDomainsCard = ({ onClose }: { onClose: () => void }) => {
  const [domainText, setDomainText] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Normalize textarea → lines
      const domains = domainText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [domainName, url] = line.split(",").map((v) => v?.trim());
          return {
            domainName: domainName?.toLowerCase(),
            url: url || undefined,
          };
        });

      // Deduplicate
      const uniqueDomains = Array.from(
        new Map(domains.map((d) => [d.domainName, d])).values()
      );

      if (!uniqueDomains.length) {
        toast.error("Please add at least one valid domain.");
        return;
      }

      const res =await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}domain/adddomain`,
        { domains: uniqueDomains },
        { withCredentials: true }
      );

      const { added, manualReview, failed, remaining } = res.data;

      let toastMessage = `✅ Domain processing completed\n\n`;

      if (added?.length) {
        toastMessage += `🟢 Added (${added.length}):\n${added.join(", ")}\n\n`;
      }

      if (manualReview?.length) {
        toastMessage += `🟡 Manual review (${manualReview.length}):\n${manualReview.join(", ")}\n\n`;
      }

      if (failed?.length) {
        toastMessage += `🔴 Failed (${failed.length}):\n${failed.join(", ")}\n\n`;
      }

      toastMessage += `📦 Remaining slots: ${remaining}`;

      toast.success(toastMessage, {
        autoClose: 8000,
        style: { whiteSpace: "pre-line" },
      });
      setDomainText("");
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to add domains"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <form onSubmit={onSubmitHandler}>
        <p className="text-center text-sm text-slate-600 mb-4">
          Upload an Excel file or manually enter domains below.
        </p>

        {/* Excel Upload */}
        <ExcelDropZone
          onTextExtracted={(text) => {
            setDomainText((prev) =>
              prev ? `${prev}\n${text}` : text
            );
            toast.success("Excel domains added to textarea");
          }}
        />

        {/* Textarea */}
        <textarea
          value={domainText}
          onChange={(e) => setDomainText(e.target.value)}
          placeholder={`example.com\nexample.org, https://example.org`}
          className="mt-6 w-full max-w-2xl mx-auto block border border-gray-300 rounded-lg p-4 text-blue-600 italic focus:outline-none"
          rows={6}
        />

        {/* Confirmations */}
        <div className="mt-8 space-y-4 max-w-2xl mx-auto text-sm">
          <label className="flex items-center gap-3">
            <input type="checkbox" required className="w-5 h-5" />
            I confirm that I own these domains.
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" required className="w-5 h-5" />
            I agree to the listing requirements.
          </label>

          <label className="flex items-start gap-3">
            <button
              type="button"
              onClick={downloadDomainTemplate}
              className="text-blue-600 underline hover:text-blue-700 cursor-pointer"
            >
              Download template
            </button>
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Domains"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddDomainsCard;
