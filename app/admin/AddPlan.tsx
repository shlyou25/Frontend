'use client'
import React, { FormEvent, useState } from "react";
import { SelectedUser } from "./UserTable";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

interface AddPlanProps {
    selectedUser: SelectedUser | null;
    onClose: () => void;
}

interface planData {
    userId: string,
    title: string,
    feature: string,
    durationInMonths: string
}

const AddPlan = ({ selectedUser, onClose }: AddPlanProps) => {
    const [planData, setPlanData] = useState<planData>({
        userId: '',
        title: '',
        feature: '',
        durationInMonths: ''
    });
    const [loaderStatus, setLoaderStatus] = useState(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlanData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }
    const onSubmitHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        if (loaderStatus) return;

        e.preventDefault();
        setLoaderStatus(true);

        const payload = {
            ...planData,
            userId: selectedUser?.userId,
        };

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_apiLink}plan/addplan-admin`,
                payload,
                { withCredentials: true }
            );

            toast.success(res.data.message);
            onClose();

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );

        } finally {
            setLoaderStatus(false); // ✅ ALWAYS turn off loader
        }
    };


    return (
        <section className="relative max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">

            {loaderStatus && (
                <div className="absolute inset-0 bg-white/70 dark:bg-gray-800/70 flex items-center justify-center z-50">
                    <Loader />
                </div>
            )}

            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                Custom Plan
            </h2>

            <form onSubmit={onSubmitHandler}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" >Email</label>
                        <input value={selectedUser?.email} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                            readOnly
                        />
                    </div>
                    <div></div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200">Plan Title</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                            name="title"
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" >Allowed Domain Number</label>
                        <input type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                            name="feature"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" >Duration in Month</label>
                        <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                            name="durationInMonths"
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button disabled={loaderStatus} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">{loaderStatus ? "Saving..." : "Save"}</button>
                </div>
            </form>

        </section>

    )
}
export default AddPlan