"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Confirmation from "@/components/Confirmation";

interface PromotedDomain {
    domainId: string;
    domain: string;
    priority: number;
    status: "Pass" | "Fail" | "Manual Review";
    finalUrl?: string;
}

type PromotedDomainProps = {
    setIsPromotedDomain: React.Dispatch<React.SetStateAction<boolean>>;
};


const PromotedDomainTable = ({ setIsPromotedDomain }: PromotedDomainProps) => {
    const [domains, setDomains] = useState<PromotedDomain[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);

    const deletePromotedDomain = async (domainId: string) => {
        return axios.delete(
            `${process.env.NEXT_PUBLIC_apiLink}domain/promoted/${domainId}`,
            { withCredentials: true }
        );
    };
    const handleDeleteClick = (domainId: string) => {
        setSelectedDomainId(domainId);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedDomainId) return;
        try {
            await deletePromotedDomain(selectedDomainId);
            setDomains(prev =>
                prev.filter(d => d.domainId !== selectedDomainId)
            );
            setConfirmOpen(false);
            setSelectedDomainId(null);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete domain");
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_apiLink}domain/getallpromoteddomain`,
                    {
                        withCredentials: true,
                        signal: controller.signal
                    }
                );

                setDomains(res.data.domains);
            } catch (err: any) {
                if (err.name === "CanceledError") return;
                setError("Failed to load promoted domains");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        return () => controller.abort();
    }, []);
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <button
                onClick={() => setIsPromotedDomain(false)}
                className="mb-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
                ← Back
            </button>
            <h1 className="text-2xl font-semibold mb-6">Promoted Domains</h1>
            {loading && (
                <div className="text-gray-500">Loading promoted domains...</div>
            )}
            {error && (
                <div className="text-red-600 font-medium">{error}</div>
            )}
            {!loading && !error && (
                <div className="overflow-hidden rounded-xl border shadow-sm">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Priority
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Domain
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Final URL
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {domains?.map((d) => (
                                <tr
                                    key={d.domainId}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                            {d.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {d.domain}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${d.status === "Pass"
                                                ? "bg-green-100 text-green-700"
                                                : d.status === "Fail"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {d.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {d.finalUrl ? (
                                            <a
                                                href={d.finalUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Visit
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDeleteClick(d.domainId)}
                                            className="text-gray-500 hover:text-gray-800 transition"
                                            aria-label="Delete domain"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {domains.length === 0 && (
                        <div className="p-6 text-center text-gray-500">
                            No promoted domains found
                        </div>
                    )}
                </div>
            )}
            <Confirmation
                open={confirmOpen}
                onCancel={() => {
                    setConfirmOpen(false);
                    setSelectedDomainId(null);
                }}
                onConfirm={handleConfirmDelete}
            />

        </div>
    );
};

export default PromotedDomainTable;
