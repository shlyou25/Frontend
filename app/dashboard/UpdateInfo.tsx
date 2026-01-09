import React, { ChangeEvent, useState } from 'react'
import {  toast } from 'react-toastify';
import { backendUserData } from './profile'
import axios from 'axios'


interface UpdateInfoProps extends backendUserData {
  setUpdateInfoStatus: React.Dispatch<React.SetStateAction<boolean>>;
}


const UpdateInfo = (props: UpdateInfoProps) => {
    const [updateInfo, setUpdateInfo] = useState<backendUserData>({
        name: props?.name,
        email: props?.email,
        phoneNumber: props?.phoneNumber,
    })
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_apiLink}user/updateuserinfo`, updateInfo,
                { withCredentials: true }
            )
            toast.success(res?.data?.message)
            props.setUpdateInfoStatus(false)
        } catch (error:any) {
          toast.error(error?.response?.data?.message || 'An unexpected Error Occured',{
            position:'top-right'
          })
        }
    }
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
                        <label className="text-gray-700" >Phone Number</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                            value={updateInfo.phoneNumber ?? ''}
                            onChange={onChangeHandler}
                            name='phoneNumber'
                        />
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