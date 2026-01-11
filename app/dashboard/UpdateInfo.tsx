import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify';
import { backendUserData } from './profile'
import axios from 'axios'


interface UpdateInfoProps extends backendUserData {
    setUpdateInfoStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateInfo = (props: UpdateInfoProps) => {
    const PHONE_REGEX = /^\+[1-9]\d{7,14}$/;
    const [errors, setErrors] = useState<{ phoneNumber?: string }>({});
    const [updateInfo, setUpdateInfo] = useState<backendUserData>({
        name: props?.name,
        email: props?.email,
        phoneNumber: props?.phoneNumber,
    })
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = e.target;
        
        setUpdateInfo((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === "phoneNumber") {
            if (!PHONE_REGEX.test(value)) {
                setErrors({ phoneNumber: "Enter a valid phone number including country code" });
            } else {
                setErrors({});
            }
        }
    };
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!PHONE_REGEX.test(updateInfo.phoneNumber || "")) {
            toast.error("Invalid phone number");
            return;
        }
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_apiLink}user/updateuserinfo`,
                updateInfo,
                { withCredentials: true }
            );

            toast.success(res?.data?.message);
            props.setUpdateInfoStatus(false);

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "An unexpected Error Occured", {
                position: "top-right",
            });
        }
    };

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">Update Profile Information</h2>
            <form onSubmit={onSubmitHandler}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700" >Name</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                            value={updateInfo.name ?? ''}
                            onChange={onChangeHandler}
                            name='name'
                        />
                    </div>
                    <div>
                        <label className="text-gray-700" >Email</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                            value={updateInfo.email ?? ''}
                            onChange={onChangeHandler}
                            name='email'
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Phone Number - with country code</label>
                        <input
                            type="text"
                            className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md ${errors.phoneNumber ? "border-red-500" : "border-gray-200"
                                }`}
                            value={updateInfo.phoneNumber ?? ""}
                            onChange={onChangeHandler}
                            name="phoneNumber"
                        />
                        {errors.phoneNumber && (
                            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                        )}
                    </div>

                </div>
                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                </div>
            </form>

        </section>
    )
}

export default UpdateInfo