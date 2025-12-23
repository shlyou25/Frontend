"use client";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image'

export interface PlanCardInterface {
    title: string;
    price: number;
    per: string;
    feature: number;
    startDate?: string;
    endingDate?: string;
}


const Plancard = ({ title, price, per, feature }: PlanCardInterface) => {
    const router=useRouter();
    const buyPlanHandler = () => {
    router.push(`/payment?plan=${encodeURIComponent(title)}`);
  };

    return (
        <div className="relative bg-linear-to-b from-[#F6F9FF] to-[#EEF3FF] rounded-4xl shadow-[0_4px_24px_rgba(146,151,255,0.12)] border border-[#EBEEF8] p-8 w-full max-w-xs flex flex-col items-start mx-auto ">
            <div className="absolute top-4 left-4">
                <div className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-[0_1px_6px_rgba(166,178,255,0.15)]">
                    <Image src="/assets/icons/arrow-right.webp" alt="arrow" height={14} width={14} />
                </div>
            </div>
            <div className="w-full mt-12 mb-4 text-left">
                <span className="font-semibold text-xl text-[#1C1E21]">{title}</span>
            </div>
            <div className="flex items-end w-full mb-1">
                <span className="text-[2rem] font-bold text-black leading-tight">{`$ ${price}`}</span>
                <span className="text-lg text-[#707277] ml-2 pb-1">/ {per}</span>
            </div>
            <div className="w-full text-base text-[#26282C] mb-3 text-left">{feature} Names</div>
            <button className="w-full bg-[#2865E8] rounded-full text-white font-medium py-3 text-base hover:bg-[#1f51bd] transition mt-2 text-left pl-5 cursor-pointer"
                onClick={buyPlanHandler}
            >
                Start 30 Day Free Trial
            </button>
            <ToastContainer />
        </div>
    )
}
export default Plancard
