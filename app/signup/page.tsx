'use client'

import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import Link from 'next/link';

interface UserData {
  name: string;
  email: string;
  password: string;
  cnfpassword: string;
  terms: boolean;
}

const Page = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    cnfpassword: '',
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
    if (userData.password !== userData.cnfpassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoaderStatus(true);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_apiLink}auth/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        terms: userData.terms,
      });

      toast.success(res?.data.message);
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.response?.data.message || "An unexpected error occurred", {
        position: 'top-right',
      });
    } finally {
      setLoaderStatus(false);
    }
  };

  return (
    <div className="bg-white lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <NavbarComponenet colorText="S" plainText="ignUp" IsParaText={false} />
      {loaderStatus ? (
        <Loader />
      ) : (
        <div className="lg:px-[10%] lg:pt-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white">
              <h2 className="text-2xl font-bold text-center mb-8">
                <span className="text-blue-600">Create</span> an Account
              </h2>
              <form className="space-y-6" onSubmit={onSubmitHandler} noValidate>
                <div className="w-full">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-lg bg-blue-50 px-4 py-2 text-base border border-transparent focus:border-blue-500"
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password*
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-lg bg-blue-50 px-4 py-2 text-base border border-transparent focus:border-blue-500"
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password*
                  </label>
                  <input
                    name="cnfpassword"
                    type="password"
                    required
                    className="block w-full rounded-lg bg-blue-50 px-4 py-2 text-base border border-transparent focus:border-blue-500"
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    onChange={onChangeHandler}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <div className="pt-2 w-full flex justify-start">
                  <button
                    type="submit"
                    className="
                      cursor-pointer
                      rounded-full
                      px-8
                      py-2
                      bg-linear-to-r from-blue-600 to-blue-400
                      text-white
                      font-semibold
                      shadow-md
                      focus:outline-none
                      transition
                      w-[220px] 
                      text-center
                    "
                  >
                    SIGN UP
                  </button>
                </div>
              </form>
               <p className="text-slate-600 text-sm mt-6 text-center">Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:underline ml-1">Login here</Link></p>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Page;
