import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

interface UsersInfo {
  success: boolean;
  totalUsers: number;
  users: Array<{
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    activePlan: string;
    planActivationDate: string;
    planEndingDate: string;
    numberOfDomains: number;
  }>;
}


const Table = () => {
  const [userInfo, setUserInfo] = useState<UsersInfo>({
    success: false,
    totalUsers: 0,
    users: []
  });
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}user/alluseroverview`,
          { withCredentials: true }
        );
        setUserInfo(res.data);
      } catch (error) {
        toast.error('Error Fetching Users');
      }
    };

    fetchUserInfo();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return userInfo.users;

    const query = search.toLowerCase();

    return userInfo.users.filter((user) =>
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phoneNumber?.includes(query)
    );
  }, [search, userInfo.users]);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Users Data
        </h2>
      </div>
      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <input
          placeholder="Search a user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-72 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-6 overflow-hidden border border-slate-200 rounded-xl text-left">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full text-sm">

            <thead className="sticky top-0 bg-white z-10 text-slate-400 border-b">
              <tr className="uppercase text-black text-center">
                <th className="py-3 px-2">Name </th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">Phone Number</th>
                <th className="py-3 px-2">Current Plan</th>
                <th className="py-3 px-2">Plan Activated Date</th>
                <th className="py-3 px-2">Plan Ending Date</th>
                <th className="py-3 px-2">Number Of Domains</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr
                  key={user.userId}
                  className="border-b last:border-none hover:bg-slate-50 text-left"
                >
                  <td className="py-4 px-2 font-medium text-slate-700">
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td >{user.phoneNumber}</td>
                  <td >{user.activePlan}</td>
                  <td className="text-center">
                    {new Date(user.planActivationDate).toLocaleDateString()}
                  </td>

                  <td className="text-center">{new Date(user?.planEndingDate)?.toLocaleDateString()}</td>
                  <td className="text-center">{user.numberOfDomains}</td>
                  {/* <td className="px-2">
                    <div className="flex gap-2 justify-center">
                      <button className="w-8 h-8 bg-blue-500 rounded-md text-white text-sm">
                        ✎
                      </button>
                      <button className="w-8 h-8 bg-red-500 rounded-md text-white text-sm">
                        🗑
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;