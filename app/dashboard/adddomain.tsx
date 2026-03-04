"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import ExcelDropZone from "./ExcelDropZone";
import { downloadDomainTemplate } from "../../utils/downloadDomainTemplate";
import Link from "next/link";

const AddDomainsCard = ({ onClose }: { onClose: () => void }) => {
  const [domainText, setDomainText] = useState("");
  const [loading, setLoading] = useState(false);

  const AI_PROMPT = `Format each root domain into the following structure:
<domain.com>, <https://www.NamePros.com/parked/domain.com>
Output as a plain text list only.
Domains:
<domain1>
<domain2>
<domain3>`;

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (domainText.includes("Format each root domain")) {
      toast.error("Please replace the template text with actual domains.");
      return;
    }
    toast.success('Domains submitted for addition to your portfolio. You will be notified once they are added.')
    try {
      setLoading(true);
      const isValidDomain = (domain: string) =>
        /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain);

      // Normalize textarea → lines
      const parsedDomains = domainText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [domainName, url] = line.split(",").map((v) => v?.trim());

          return {
            domainName: domainName?.toLowerCase(),
            url: url || undefined,
            rawLine: line,
          };
        });

      // 🚨 VALIDATION (KEY FIX)
      const invalidRows = parsedDomains.filter(
        (d) => !d.domainName || !isValidDomain(d.domainName)
      );

      if (invalidRows.length) {
        toast.error(
          "Each line must start with a valid root domain (e.g., example.com). URL alone is not allowed."
        );
        setLoading(false);
        return;
      }

      // ✅ clean objects
      const domains = parsedDomains.map(({ rawLine, ...rest }) => rest);

      // ✅ dedupe
      const uniqueDomains = Array.from(
        new Map(domains.map((d) => [d.domainName, d])).values()
      );

      if (!uniqueDomains.length) {
        toast.error("Please add at least one valid domain.");
        setLoading(false);
        return;
      }

      const res = await axios.post(
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
      <form onSubmit={onSubmitHandler} className="relative">
        <p className="text-center text-sm text-slate-600 mb-6">
          Add domains by uploading a spreadsheet or entering them below.
        </p>
        <div className="max-w-2xl mx-auto space-y-6">
          <ExcelDropZone
            onTextExtracted={(text) => {
              setDomainText(prev => (prev ? `${prev}\n${text}` : text));
              toast.success("Excel domains added to textarea");
            }}
          />
          <div className="text-center">
            <button
              type="button"
              onClick={downloadDomainTemplate}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
            >
              Download template
            </button>
          </div>
          <textarea
            value={domainText}
            onChange={(e) => setDomainText(e.target.value)}
            placeholder={`Enter the root domain as it should appear in the Buy section — one per line.
To redirect the link, enter the root domain followed by a comma and the destination URL.
Sample:
example.com
example.com, https://www.LanderHost.com/parked/example.com`}
            rows={7}
            className="
        w-full
        border border-gray-300
        rounded-xl
        p-4
        text-slate-700
        placeholder:text-slate-400
        focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
        transition
      "
          />
           <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm text-slate-700">
                <p className="font-semibold text-blue-900 mb-1">
                  💡 Pro tip
                </p>
                <p className="mb-3">
                  Use an AI tool to convert root domains into properly formatted URLs.
                  Copy and paste the prompt below.
                </p>

                <pre className="text-xs bg-white border border-blue-200 rounded-lg p-3 overflow-auto text-slate-700">
                  {AI_PROMPT}
                </pre>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(AI_PROMPT);
                  toast.success("Prompt copied");
                }}
                className="shrink-0 inline-flex items-center h-8 px-3 rounded-md
                 bg-blue-600 text-white text-xs font-medium
                 hover:bg-blue-700 transition"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Confirmations */}
          <div className="space-y-4 text-sm">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 w-5 h-5 rounded" />
              <span className="text-slate-700">
                I confirm I am the registrant of the domain(s).
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 w-5 h-5 rounded" />
              <span className="text-slate-700">
                I agree to the listing{" "}
                <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                  terms.
                </Link>
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="
          inline-flex items-center justify-center
          min-w-45
          rounded-full
          bg-blue-600 text-white
          px-8 py-3
          font-semibold
          shadow-sm hover:shadow-md
          hover:bg-blue-700
          active:scale-[0.98]
          disabled:opacity-50
          transition-all duration-200
        "
            >
              {loading ? "Adding..." : "Add Domains"}
            </button>
          </div>

        </div>
      </form>
    </>
  );
};

export default AddDomainsCard;
