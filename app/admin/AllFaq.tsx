import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";


interface FaqItem {
    _id: string;
    question: string;
    answer: string;
    priorityNumber: number;
}

const AllFaq = ({ setIsAllFaq }: any) => {
    const [faq, setFaq] = useState<FaqItem[]>([]);

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
    }, []); // Empty deps - runs once on mount

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
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition w-full sm:w-auto"
                    onClick={() => setIsAllFaq('createFaq')}
                >
                    Add FAQ
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Question
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Answer
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Pariority
                        </th>
                        <th scope="col" className="px-6 py-3 font-medium">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {faq?.map(faq => (
                        <tr className="bg-neutral-primary border-b border-default">
                            <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                {faq.question}
                            </th>
                            <td className="px-6 py-4">
                                {faq.answer}
                            </td>
                            <td className="px-6 py-4">
                                {faq.priorityNumber}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleDelete(faq._id)} // Replace with your delete function
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    )
}
export default AllFaq