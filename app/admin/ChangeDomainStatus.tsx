"use client"

import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

export type DomainStatus = "pass" | "fail" | "manual_review"

type Props = {
  status: string
  domainId: string
  onRequestUpdated: () => void
}

const BACKEND_STATUS_MAP: Record<string, DomainStatus> = {
  Pass: "pass",
  Fail: "fail",
  "Manual Review": "manual_review",
}

const STATUS_UI: Record<
  DomainStatus,
  { label: string; bg: string; text: string }
> = {
  pass: {
    label: "Pass",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  manual_review: {
    label: "Manual Review",
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
  fail: {
    label: "Fail",
    bg: "bg-red-50",
    text: "text-red-700",
  },
}

const normalizeStatus = (status?: string): DomainStatus =>
  BACKEND_STATUS_MAP[status ?? ""] ?? "manual_review"

export default function ChangeDomainStatus({
  status,
  domainId,
  onRequestUpdated,
}: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [askFinalUrl, setAskFinalUrl] = useState(false)
  const [finalUrl, setFinalUrl] = useState("")

  const safeStatus = normalizeStatus(status)
  const ui = STATUS_UI[safeStatus]

  const submitChange = async (
    nextStatus: DomainStatus,
    url?: string
  ) => {
    if (loading) return

    try {
      setLoading(true)

      await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}domain/changedomainstatus`,
        {
          domainId,
          status: nextStatus === "pass" ? "Pass" : "Fail",
          ...(url ? { finalUrl: url } : {}),
        },
        { withCredentials: true }
      )

      toast.success("Status change requested")
      onRequestUpdated()
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      )
    } finally {
      setLoading(false)
      setOpen(false)
      setAskFinalUrl(false)
      setFinalUrl("")
    }
  }

  const handlePassClick = () => {
  // 🔒 ANY → Pass requires final URL
  if (safeStatus !== "pass") {
    setAskFinalUrl(true)
  }
}


  const handleFinalUrlSubmit = () => {
    if (!finalUrl.trim()) {
      toast.error("Final URL is required")
      return
    }

    try {
      new URL(finalUrl) // basic URL validation
    } catch {
      toast.error("Enter a valid URL")
      return
    }

    submitChange("pass", finalUrl)
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        disabled={loading}
        className={`
          inline-flex items-center gap-2
          px-3 py-1.5 rounded-full
          text-xs font-semibold
          ${ui.bg} ${ui.text}
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {ui.label}
        <span className="text-[10px]">▾</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-44 rounded-md border bg-white shadow-md p-1">
          {safeStatus !== "pass" && (
            <button
              onClick={handlePassClick}
              className="w-full px-3 py-2 text-left text-xs hover:bg-green-50 text-green-700"
            >
              Mark as Pass
            </button>
          )}

          {safeStatus !== "fail" && (
            <button
              onClick={() => submitChange("fail")}
              className="w-full px-3 py-2 text-left text-xs hover:bg-red-50 text-red-700"
            >
              Mark as Fail
            </button>
          )}

          {/* 🔹 FINAL URL INPUT (ONLY FOR Manual → Pass) */}
          {askFinalUrl && (
            <div className="mt-2 p-2 border-t">
              <input
                type="url"
                placeholder="Final URL (https://...)"
                value={finalUrl}
                onChange={e => setFinalUrl(e.target.value)}
                className="w-full rounded border px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                onClick={handleFinalUrlSubmit}
                className="mt-2 w-full rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white hover:bg-green-700"
              >
                Confirm Pass
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
