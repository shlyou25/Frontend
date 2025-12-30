import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface PromotionProps {
    domainPromotion: {
        domain_id: string;
        domain: string;
    };
    onClose: () => void;
}
const Promotion = ({ domainPromotion, onClose }: PromotionProps) => {
    const [priority, setPriority] = useState<number | undefined>(undefined);
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate required data
        if (!domainPromotion?.domain_id || priority === undefined) {
            toast.error("Domain ID and priority are required");
            return;
        }

        try {
            const payload = {
                domainId: domainPromotion.domain_id,
                priority: priority  
            };

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_apiLink}domain/promote`,
                payload,
                { withCredentials: true }
            );
            toast.success(res?.data?.message || "Success!");
            onClose();
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message ||
                err?.message ||
                "An unexpected error occurred";
            toast.error(errorMessage);
            onClose()
        }
    };

    return (
        <>
        <form onSubmit={onSubmitHandler} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label className="block mb-2.5 text-sm font-medium text-heading">Domain Name</label>
                <input type="domain" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    value={domainPromotion?.domain}
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2.5 text-sm font-medium text-heading">Promotion Number</label>
                <input type="number" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••"
                    required
                    name="priority"
                    onChange={(e) => setPriority(e.target.value ? Number(e.target.value) : undefined)}

                />
            </div>
            <label className="flex items-center mb-5">
            </label>
            <button type="submit" className="text-white bg-blue-800 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
        </form>
        <ToastContainer/>
        </>

    )
}

export default Promotion