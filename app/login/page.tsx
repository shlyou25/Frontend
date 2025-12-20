'use client';

import { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/components/Loader';
import 'react-toastify/dist/ReactToastify.css';

interface UserDataLogin {
  email: string;
  password: string;
  terms: boolean;
}

const Page = () => {
  const [userData, setUserData] = useState<UserDataLogin>({
    email: '',
    password: '',
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

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

    // 🔐 ADMIN → OTP REQUIRED (200)
    if (res.data?.code === "ADMIN_OTP_REQUIRED") {
      toast.info("OTP sent to your email");
      router.push("/verify");
      return;
    }

    // ✅ NORMAL USER → SESSION EXISTS
    const me = await axios.get(
      `${process.env.NEXT_PUBLIC_apiLink}auth/me`,
      { withCredentials: true }
    );
    toast.success("Login successful");
    router.push(me.data.user.role === "admin" ? "/admin" : "/");

  } catch (error: any) {
    // 🔒 FORCED PASSWORD CHANGE (403)
    if (
      error?.response?.status === 403 &&
      error?.response?.data?.code === "PASSWORD_CHANGE_REQUIRED"
    ) {
      router.push("/changepassword");
      return;
    }

    toast.error(
      error?.response?.data?.message || "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white lg:px-[10%] lg:pt-9">
      <NavbarComponenet colorText="S" plainText="ignIn" IsParaText={false} />

      <div className="lg:px-[10%] lg:pt-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-blue-600">Login</span> to Your Account
          </h2>

          <form className="space-y-6" onSubmit={onSubmitHandler} noValidate>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg bg-blue-50 px-4 py-2"
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password *</label>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-lg bg-blue-50 px-4 py-2"
                onChange={onChangeHandler}
              />
            </div>

            <div className="flex items-center">
              <input
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4"
                onChange={onChangeHandler}
              />
              <label className="ml-2 text-sm">
                I agree to the Terms & Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="rounded-full px-8 py-2 bg-blue-600 text-white font-semibold"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Page;
