'use client';

import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import {  toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Footer from '../../components/Footer';
import NavbarComponenet from '../../components/NavbarComponenet';
import Link from 'next/link';

interface UserData {
  email: string;
  password: string;
  cnfpassword: string;
  terms: boolean;
}

const Page = () => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
    cnfpassword: '',
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔐 Client-side safety checks
    if (!userData.terms) {
      toast.error("You must accept the Terms & Privacy Policy");
      return;
    }

    if (userData.password !== userData.cnfpassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}auth/register`,
        {
          email: userData.email,
          password: userData.password,
          terms: userData.terms,
        },
        {
          withCredentials:true
        }
      );

      // ✅ OTP flow ONLY
      if (res.data?.code === "EMAIL_OTP_SENT") {
        sessionStorage.setItem('verify_email_user_domz',userData?.email)
        toast.success("OTP sent to your email");
        router.push("/verify?type=email");
        return;
      }

      // Fallback (should not happen)
      toast.success(res.data?.message || "Registration successful");

    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white lg:px-[10%] lg:pt-9">
      <NavbarComponenet colorText="S" plainText="ignUp" IsParaText={false} />

      {loading ? (
        <Loader />
      ) : (
        <div className="lg:px-[10%] lg:pt-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              <span className="text-blue-600">Create</span> an Account
            </h2>

            <form className="space-y-6" onSubmit={onSubmitHandler} noValidate>
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email*
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg bg-blue-50 px-4 py-2"
                  onChange={onChangeHandler}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password*
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-lg bg-blue-50 px-4 py-2"
                  onChange={onChangeHandler}
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password*
                </label>
                <input
                  name="cnfpassword"
                  type="password"
                  required
                  className="w-full rounded-lg bg-blue-50 px-4 py-2"
                  onChange={onChangeHandler}
                />
              </div>

              {/* TERMS */}
              <div className="flex items-center">
                <input
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={onChangeHandler}
                />
                <label className="ml-2 text-sm">
                  I agree to the Terms & Privacy Policy
                </label>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full rounded-full bg-blue-600 text-white py-2 font-semibold"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm mt-6 text-center">
              Already have an account?
              <Link href="/login" className="text-blue-600 ml-1">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Page;
