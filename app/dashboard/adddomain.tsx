"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";



const AddDomainsCard = ({ onClose }: { onClose: () => void }) => {
  const [domainData, setDomainData] = useState("");
  const [loaderStatus, setLoaderStatus] = useState(false);


  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDomainData(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderStatus(true);
    const formatted = domainData
      .split(/[\n,]+/)
      .map(d => d.trim().toLowerCase())
      .filter(Boolean);

    if (!formatted.length) {
      toast.error("Please enter at least one domain.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}domain/adddomain`,
        { domains: formatted },
        { withCredentials: true }
      );

      const {
        message,
        added = [],
        manualReview = [],
        failed = [],
        remaining
      } = res.data;

      // ✅ Base success message
      toast.success(message || "Domain processing completed.");

      // ✅ Added domains
      if (added.length > 0) {
        toast.success(
          `Added (${added.length}): ${added.join(", ")}`,

        );

      }

      // ⚠️ Manual review domains
      if (manualReview.length > 0) {
        toast(
          `Manual Review (${manualReview.length}): ${manualReview.join(", ")}`,

        );
      }

      // ❌ Failed domains
      if (failed.length > 0) {
        toast.error(
          `Failed (${failed.length}): ${failed.join(", ")}`,

        );
      }

      // ℹ️ Remaining quota (optional)
      if (remaining !== undefined) {
        toast(
          `Remaining domain quota: ${remaining}`,
        );
      }

      setDomainData("");
      onClose(); // ✅ close modal

    } catch (error: any) {
      const data = error?.response?.data;

      toast.error(
        data?.message || "An unexpected error occurred"
      );

      // 🔎 Optional: show backend-provided breakdown even on failure
      if (data?.failed?.length) {
        toast.error(
          `Failed: ${data.failed.join(", ")}`,

        );
      }

    }
    finally {
      setLoaderStatus(false); // ✅ ALWAYS turn off loader
    }
  };


  return (
    <>
      {loaderStatus && (
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <form onSubmit={onSubmitHandler}>
        <p className="text-center text-lg mb-6">
          To bulk upload domains, browse or drag the file into the dropbox.
        </p>

        <button
          type="button"
          className="w-64 h-20 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-2xl text-gray-600"
        >
          +
        </button>
        <p className="text-center text-lg mt-8 mb-4">
          To manually add domains, paste or enter them one per line.
        </p>
        <textarea
          value={domainData}
          placeholder="example.com"
          className="w-full max-w-2xl mx-auto block border border-gray-300 rounded-lg p-4 text-blue-600 italic focus:outline-none text-left"
          rows={5}
          onChange={onChangeHandler}
          required
        />
        <div className="mt-8 space-y-4 max-w-2xl mx-auto">
          <label className="flex items-center gap-3 text-gray-700">
            <input type="checkbox" className="w-5 h-5" required />
            I confirm that this domain is registered and owned by me.
          </label>

          <label className="flex items-center gap-3 text-gray-700">
            <input type="checkbox" className="w-5 h-5" required />
            I acknowledge and agree to the listing requirements{" "}
            <a href="#" className="underline text-blue-600">View here</a>.
          </label>
        </div>

        <div className="flex justify-center mt-8">
          <button
          disabled={loaderStatus}
            type="submit"
            className="rounded-full bg-blue-600 text-white px-6 py-2 hover:bg-blue-700"
          >
            {loaderStatus ? "Adding..." : "Add Domain"}

          </button>
        </div>
      </form>
    </>
  );
};

export default AddDomainsCard;
