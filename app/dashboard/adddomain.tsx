"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';



const  AddDomainsCard=()=> {
    const [domainData, setDomainData] = useState<string>("");

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setDomainData(value);
    };
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let formatted = domainData
            .split(/[\n,]+/)        // split by comma OR newline ONLY
            .map(d => d.trim().toLowerCase())
            .filter(Boolean);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_apiLink}domain/adddomain`, { domains: formatted },
                { withCredentials: true }
            )
            toast.success(res?.data?.message)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'An unexpected Error Occured', {
                position: 'top-right'
            })
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <p className="text-center text-lg mb-6">
                    To bulk upload domains, browse or drag the file into the dropbox.
                </p>

                <button className="w-64 h-20 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-2xl text-gray-600">
                    +
                </button>

                <p className="text-center text-lg mt-8 mb-4">
                    To manually add domains, paste or enter them one per line.
                </p>

                <textarea
                    placeholder="Click here for quick uploading tips"
                    className="w-full max-w-2xl mx-auto block border border-gray-300 rounded-lg p-4 text-blue-600 italic text-center focus:outline-none"
                    rows={5}
                    onChange={onChangeHandler}
                />
                <div className="mt-8 space-y-4 max-w-2xl mx-auto">
                    <label className="flex items-center gap-3 text-gray-700">
                        <input type="checkbox" className="w-5 h-5" required />
                        I confirm that this domain is registered and owned by me.
                    </label>

                    <label className="flex items-center gap-3 text-gray-700">
                        <input type="checkbox" className="w-5 h-5" required />
                        I acknowledge and agree to the listing requirements.{" "}
                        <a href="#" className="underline text-blue-600">View here.</a>
                    </label>
                </div>
            </form>
            <ToastContainer />
        </>
    );
}

export default AddDomainsCard