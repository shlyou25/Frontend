"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileInfo from "./ProfileInfo";
import UpdateInfo from "./UpdateInfo";

export interface backendUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  secondaryEmail?: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<backendUserData>();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_apiLink}user/getuserbyid`,
        { withCredentials: true }
      );
      setUserData(res.data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [isEditing]);

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden transition-all duration-300">
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Profile Information
            </h2>
            <p className="text-sm text-gray-500">
              Manage your personal and contact details
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}
        </div>

        <div className="p-6">
          {loading ? (
            <Skeleton />
          ) : isEditing ? (
            <UpdateInfo
              {...userData}
              setUpdateInfoStatus={setIsEditing}
            />
          ) : (
            <ProfileInfo
              {...userData}
            />
          )}
        </div>
      </div>
    </section>
  );
};

const Skeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded w-3/4" />
    ))}
  </div>
);

export default Profile;
