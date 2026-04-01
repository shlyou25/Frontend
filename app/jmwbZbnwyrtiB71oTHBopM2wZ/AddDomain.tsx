"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { downloadDomainTemplate } from "../../utils/downloadDomainTemplate";
import Link from "next/link";
import { CheckCircle, XCircle, Package } from "lucide-react";
import ExcelDropZone from "../dashboard/ExcelDropZone";

const AddDomain = ({ onClose }: { onClose: () => void }) => {
  const [domainText, setDomainText] = useState("");
  const [sellerName, setSellerName] = useState("");
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

    if (loading) return;

    if (domainText.includes("Format each root domain")) {
      toast.error("Please replace the template text.");
      return;
    }

    try {
      setLoading(true);

      const isValidDomain = (domain: string) =>
        /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i.test(domain);

      const parsedDomains = domainText
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

      const invalidRows = parsedDomains.filter(
        (d) => !d.domainName || !isValidDomain(d.domainName)
      );

      if (invalidRows.length) {
        toast.error("Invalid domain format detected.");
        setLoading(false);
        return;
      }

      const uniqueDomains = Array.from(
        new Map(parsedDomains.map((d) => [d.domainName, d])).values()
      );

      if (!uniqueDomains.length) {
        toast.error("Please add at least one domain.");
        setLoading(false);
        return;
      }

      if (uniqueDomains.length > 500) {
        toast.error("Max 500 domains allowed per upload.");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}domain/adddomainadmin`,
        {
          domains: uniqueDomains,
          sellerName: sellerName // ✅ ADD THIS
        },
        { withCredentials: true }
      );
      const { added, failed, failedBreakdown, remaining } = res.data;
    
      let message = `📊 Domain Upload Summary\n\n`;

      message += `🟢 Added: ${added}\n`;
      message += `🔴 Failed: ${failed}\n`;

      if (failed > 0 && failedBreakdown) {
        message += `\nBreakdown:\n`;

        if (failedBreakdown.tld) {
          message += `• Invalid TLD: ${failedBreakdown.tld}\n`;
        }

        if (failedBreakdown.urlMismatch) {
          message += `• URL Mismatch: ${failedBreakdown.urlMismatch}\n`;
        }
      }
     setSellerName("");
      if (remaining !== undefined) {
        message += `\n📦 Remaining slots: ${remaining}`;
      }

      toast.success(
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={16} />
            <span>Added: {added}</span>
          </div>

          <div className="flex items-center gap-2 text-red-600">
            <XCircle size={16} />
            <span>Failed: {failed}</span>
          </div>

          {failed > 0 && failedBreakdown && (
            <div className="pl-6 text-slate-600 text-xs">
              {failedBreakdown.tld > 0 && (
                <div>• Invalid TLD: {failedBreakdown.tld}</div>
              )}
              {failedBreakdown.urlMismatch > 0 && (
                <div>• URL mismatch: {failedBreakdown.urlMismatch}</div>
              )}
            </div>
          )}

          {remaining !== undefined && (
            <div className="flex items-center gap-2 text-blue-600 pt-1">
              <Package size={16} />
              <span>Remaining: {remaining}</span>
            </div>
          )}
        </div>,
        { autoClose: 8000 }
      );
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
      <form
        onSubmit={onSubmitHandler}
        className="flex justify-center px-4 py-10 bg-slate-50 min-h-screen"
      >
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-8">

          {/* HEADER */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">
              Add Domains
            </h2>
            <p className="text-sm text-slate-500">
              Upload or enter domains to list them for sale
            </p>
          </div>

          {/* SELLER NAME */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Seller Name
            </label>
            <input
              type="text"
              required
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              placeholder="e.g. John Nguyen"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm"
            />
          </div>

          {/* UPLOAD */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">
              Upload Domains
            </h3>

            <ExcelDropZone
              onTextExtracted={(text) => {
                setDomainText(prev => (prev ? `${prev}\n${text}` : text));
                toast.success("Excel domains added");
              }}
            />

            <button
              type="button"
              onClick={downloadDomainTemplate}
              className="text-xs text-blue-600 hover:underline"
            >
              Download template
            </button>
          </div>

          {/* TEXTAREA */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-700">
              Or Paste Domains
            </h3>

            <textarea
              value={domainText}
              onChange={(e) => setDomainText(e.target.value)}
              rows={6}
              placeholder={`example.com
example.com, https://lander.com/example`}
              className="w-full border border-slate-300 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none"
            />
          </div>

          {/* AI BOX */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 flex justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                AI Formatting Helper
              </p>
              <p className="text-xs text-slate-600 mb-2">
                Convert domains into correct format instantly
              </p>

              <pre className="text-xs bg-white border rounded-lg p-2 overflow-auto">
                {AI_PROMPT}
              </pre>
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(AI_PROMPT);
                toast.success("Copied");
              }}
              className="h-8 px-3 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
            >
              Copy
            </button>
          </div>

          {/* CONFIRMATIONS */}
          <div className="space-y-3 text-sm">
            <label className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1 w-4 h-4" />
              <span>I confirm I own these domains</span>
            </label>

            <label className="flex items-start gap-3">
              <input type="checkbox" required className="mt-1 w-4 h-4" />
              <span>
                I agree to{" "}
                <Link href="/terms" className="text-blue-600 underline">
                  terms
                </Link>
              </span>
            </label>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition active:scale-[0.98]"
          >
            {loading ? "Adding Domains..." : "Add Domains"}
          </button>

        </div>
      </form>
    </>
  );
};

export default AddDomain;
