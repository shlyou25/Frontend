import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2, SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../components/model";
import EditFaq from "./EditFaq";
import Confirmation from "../../components/Confirmation";


interface FaqItem {
    _id: string;
    question: string;
    answer: string;
    priorityNumber: number;
    category?: string;
}
export interface SelectedFaq {
    id: string;
    question: string;
    answer: string;
    priorityNumber: number;
    category?: string;
}

const AllFaq = ({ setIsAllFaq }: any) => {
    const [faq, setFaq] = useState<FaqItem[]>([]);
    const [selectedFaq, setSelectedFaq] = useState<SelectedFaq | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [open, setOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const categories = [
        "All",
        ...Array.from(
            new Set(faq.map(f => f.category).filter(Boolean))
        )
    ];
    const filteredFaqs = faq
        .filter(f =>
            selectedCategory === "All"
                ? true
                : f.category === selectedCategory
        )
        .sort((a, b) => a.priorityNumber - b.priorityNumber);



    const openDeleteModal = (id: string) => {
        setDeleteId(id)
        setIsConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        if (!deleteId) return
        handleDelete(deleteId) // ✅ YOUR EXISTING DELETE HANDLER
        setIsConfirmOpen(false)
        setDeleteId(null)
    }

    const fetchFaq = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_apiLink}faq/`);
            setFaq(res.data.faqs.sort((a: FaqItem, b: FaqItem) =>
                a.priorityNumber - b.priorityNumber
            ));
        } catch (err) {
            console.error("Failed to fetch FAQs:", err);
        }
    };

    useEffect(() => {
        fetchFaq();
    }, [refreshKey]);

    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_apiLink}faq/${id}`,
                { withCredentials: true }
            );
            toast.success(res.data.message);
            fetchFaq();
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
        }
    };
    const refreshFaq = () => {
        setRefreshKey(prev => prev + 1);
    };
    return (
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-gray-900">
                        FAQ
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        These questions will appear on the Home Page FAQ section
                    </p>
                </div>
                <div className="flex gap-3 items-center">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition w-full sm:w-auto"
                    onClick={() => setIsAllFaq('createFaq')}
                >
                    Add FAQ
                </button>
            </div>
            <div className="relative max-h-150 overflow-y-auto rounded-base">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-white/30 backdrop-blur-sm border-b border-default sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 font-medium">Question</th>
                            <th className="px-6 py-3 font-medium">Answer</th>
                            <th className="px-6 py-3 font-medium">Priority</th>
                            <th className="px-6 py-3 font-medium">Category</th>
                            <th className="px-6 py-3 font-medium">Edit</th>
                            <th className="px-6 py-3 font-medium">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFaqs?.map((faq) => (
                            <tr
                                key={faq._id}
                                className="bg-neutral-primary border-b border-default"
                            >
                                <th className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {faq.question}
                                </th>

                                <td className="px-6 py-4 text-justify">
                                    {faq.answer}
                                </td>

                                <td className="px-6 py-4">
                                    {faq.priorityNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {faq?.category}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                        onClick={() => {
                                            setOpen(true);
                                            setSelectedFaq({
                                                id: faq._id,
                                                question: faq.question,
                                                answer: faq.answer,
                                                priorityNumber: faq.priorityNumber,
                                                category: faq?.category
                                            });
                                        }}
                                    >
                                        <SquarePen className="w-5 h-5" />
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => openDeleteModal(faq._id)} // ✅ PASS ID
                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Confirmation
                open={isConfirmOpen}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete} // ✅ FUNCTION REFERENCE
            />
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="EDIT FAQ"
            >
                <EditFaq
                    selectedFaq={selectedFaq}
                    onClose={() => setOpen(false)}
                    onSuccess={refreshFaq}
                />

            </Modal>
        </div>
    )
}
export default AllFaq