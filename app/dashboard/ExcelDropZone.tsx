"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

const ExcelDropZone = ({
  onTextExtracted,
}: {
  onTextExtracted: (text: string) => void;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const processFile = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" });

      const lines = rows
        .map((row) => {
          const domain = String(row.domainName || "").trim();
          const url = String(row.url || "").trim();
          if (!domain) return null;
          return url ? `${domain}, ${url}` : domain;
        })
        .filter(Boolean)
        .join("\n");

      if (!lines) {
        toast.error("No valid domains found in file");
        return;
      }

      onTextExtracted(lines);
    } catch (err) {
      console.error(err);
      toast.error("Invalid or corrupted Excel file");
    }
  };

  return (
    <label
      className={`mx-auto flex h-24 w-64 items-center justify-center
        rounded-lg border-2 border-dashed cursor-pointer transition
        ${
          dragActive
            ? "border-blue-600 bg-blue-50"
            : "border-slate-300 bg-white hover:bg-slate-50"
        }`}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
      }}
    >
      <span className="text-3xl text-slate-400">+</span>

      {/* ✅ Label → input = guaranteed click behavior */}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
          e.target.value = ""; // allow re-select same file
        }}
      />
    </label>
  );
};

export default ExcelDropZone;
