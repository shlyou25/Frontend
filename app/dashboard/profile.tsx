import React, { useEffect, useState } from 'react'
import UpdateInfo from './UpdateInfo';
import ProfileInfo from './ProfileInfo';
import axios from 'axios';

export interface backendUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
}


const Profile = () => {
     const [userData, setUserData] = useState<backendUserData>()
       const [updateInfoStatus, setUpdateInfoStatus] = useState(false);
       useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}user/getuserbyid`,
          { withCredentials: true }
        );
        setUserData(res.data.user)
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [updateInfoStatus]);
    return (
        <section className="max-w-2xl mx-auto bg-gray-50 rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                <h2 className="text-xl font-semibold">Profile information</h2>
                {!updateInfoStatus && (
                    <button
                        onClick={() => setUpdateInfoStatus(!updateInfoStatus)}
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                        className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none"
                    >
                        Update
                    </button>
                )}

            </div>
            {updateInfoStatus ? (
                <UpdateInfo name={userData?.name} email={userData?.email} phoneNumber={userData?.phoneNumber} setUpdateInfoStatus={setUpdateInfoStatus} />
            ) : (
                <ProfileInfo name={userData?.name} email={userData?.email} phoneNumber={userData?.phoneNumber} />
            )}
        </section>
    )
}

export default Profile