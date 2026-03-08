"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  domainId: string;
  domain: string;
  onClose: () => void;
}

export default function DomainReplyEmail({
  domainId,
  domain,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [sendCopy, setSendCopy] = useState(true);

  const [form, setForm] = useState({
    subject: `Re: Availability of ${domain}`,
    message: `Hello,

Thank you for listing ${domain}.
I am interested in this domain. Please let me know the price and next steps.

Best regards,
`,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}communication/start`,
        {
          domainId,
          subject: form.subject,
          message: form.message,
          sendCopy,
        },
        { withCredentials: true }
      );

      toast.success("Message sent to seller");
      onClose();
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Subject */}
      <div>
        <label className="text-sm font-medium">Subject</label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Message */}
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          name="message"
          rows={8}
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Send copy */}
      <div className="flex items-center gap-2">
        <input
          id="sendCopy"
          type="checkbox"
          checked={sendCopy}
          onChange={(e) => setSendCopy(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="sendCopy" className="text-sm text-gray-700">
          Send a copy to my email
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-3 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm border rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
