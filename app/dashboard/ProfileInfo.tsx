
"use client";
import { backendUserData } from './page';
const ProfileInfo = (props: backendUserData) => {
    return (
        <>
            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={props.name ?? ''}
                        className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                        readOnly
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="text"
                        value={props.phoneNumber ?? ''}
                        className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                        readOnly
                    />
                </div>
                <div className="relative">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={props.email ?? ''}
                        className="w-full rounded-md px-3 py-2 border border-gray-300 focus:ring focus:ring-blue-200"
                        readOnly
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-7 text-xs text-blue-500 hover:underline"
                    >
                        Send Verification Link
                    </button>
                </div>
                {/* <button
                    type="submit"
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
                >
                    Save Changes
                </button> */}
            </form>
        </>
    )
}

export default ProfileInfo