"use client";

import NavbarComponenet from "@/components/NavbarComponenet";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";
import Link from "next/link";

interface UserDataLogin {
  email: string,
  password: string,
  terms: boolean,
}

const Page = () => {
  const [userData, setUserData] = useState<UserDataLogin>({
    email: '',
    password: '',
    terms: false,
  });
  const [loaderStatus, setLoaderStatus] = useState(false);
  const router = useRouter();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderStatus(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/login`,
        {
          email: userData.email.trim(),
          password: userData.password,
          terms: userData.terms,
        },
        { withCredentials: true }
      );

      // 🔐 Admin OTP
      if (res.data?.code === "ADMIN_OTP_REQUIRED") {
        toast.info("OTP sent to your email");

        router.push("/verify");
        return;
      }

      const me = await axios.get(
        `${process.env.NEXT_PUBLIC_apiLink}auth/me`,
        { withCredentials: true }
      );

      toast.success("Login successful");
      router.push(me.data.user.role === "admin" ? "/admin" : "/dashboard");

    } catch (error: any) {
      const data = error?.response?.data;
      const status = error?.response?.status;
      if (status === 403 && data?.code === "EMAIL_NOT_VERIFIED") {
        sessionStorage.setItem('verify_email_user_domz', userData?.email)
        toast(data.message || "EMAIL_NOT_VERIFIED");
        router.push('/verify')
        return;
      }
      if (status === 403 && data?.code === "PASSWORD_CHANGE_REQUIRED") {
        toast.error("Please change your password");
        router.push("/changepassword");
        return;
      }
      
      if(status===403 && data?.code==="ACCOUNT_NOT_ACTIVATED"){
        toast.info(data.message ||"Account Not ACTIVATED")
        return
      }
      if (status === 401) {
        toast.error("Invalid credentials");
        return;
      }
      toast.error(data?.message || "Login failed");
    } finally {
      setLoaderStatus(false);
    }
  };

  if (loaderStatus) return <Loader />
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarComponenet
        colorText="S"
        plainText="ign In"
        IsParaText={false}
      />

      {/* FORM SECTION */}
      <main className="flex-1 flex justify-center px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-3xl mt-10 lg:mt-16">

          <form className="space-y-6" onSubmit={onSubmitHandler}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded-xl bg-blue-50 px-5 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email"
                onChange={onChangeHandler}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full rounded-xl bg-blue-50 px-5 py-3
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="terms"
                checked={userData.terms}
                onChange={onChangeHandler}
                className="mt-1 h-4 w-4 rounded"
                required
              />
              <p>
                I agree to the{" "}
                <span className="text-blue-600 cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-blue-600 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full sm:w-56 rounded-full py-3
                         bg-linear-to-r from-blue-500 to-blue-600
                         text-white font-semibold shadow-md
                         hover:from-blue-600 hover:to-blue-700 transition"
            >
              LOGIN
            </button>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">
              <p>
                Don’t have an account?{" "}
                <Link href={'/signup'} className="text-blue-600 font-semibold cursor-pointer">
                  Sign Up
                </Link>
              </p>
              <Link href={'/forgot-password'} className="text-blue-600 cursor-pointer">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Page;