import axios from "axios";
import { toast } from "react-toastify";

export const logoutHandler = async (router: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_apiLink}auth/logout`,
      {},
      { withCredentials: true }
    );

    toast.success(res.data?.message || "Logged out successfully");
  } catch {
    toast.error("Logout failed");
  } finally {
    router.replace("/login");
  }
};

