'use client';

import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import Loader from '@/components/Loader';
import Subscribe from '@/utils/subscribe';

interface UserMessageInterface {
  name: string;
  email: string;
  message: string;
  subject: string;
}
const page = () => {
  const [userData, setUserData] = useState<UserMessageInterface>({
    name: '',
    email: '',
    message: '',
    subject: 'New Submisson On the Contact Form',
  });
const [loaderStatus, setLoaderStatus] = useState(false);
  
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderStatus(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}email/sendemail`,
        userData
      );

      toast.success(res?.data?.message || 'Message sent successfully');
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'An unexpected error occurred'
      );
    } finally {
      setLoaderStatus(false);
    }
  };
    if (loaderStatus) return <Loader />;
  return (
    <div className="lg:pl-[10%] lg:pr-[10%] lg:pt-9">
      <NavbarComponenet
        colorText="Let's Star"
        plainText="t the conversation"
        IsParaText
        ParaText="As a user-centric platform, we value your feedback."
        searchbarStatus={false}
      />
      <form
        onSubmit={onSubmitHandler}
        className="max-w-170 mx-auto pt-6 px-4 md:px-0"
      >
        <h2 className="text-center text-[2rem] font-bold mb-3">
          <span className="text-blue-600">Your questions</span> and feedback
          matter.
        </h2>

        <input
          type="text"
          name="name"
          required
          onChange={onChangeHandler}
          placeholder="Name"
          className="bg-blue-100 rounded-2xl w-full px-8 py-5 mb-6"
        />

        <input
          type="email"
          name="email"
          required
          onChange={onChangeHandler}
          placeholder="Email"
          className="bg-blue-100 rounded-2xl w-full px-8 py-5 mb-6"
        />

        <textarea
          name="message"
          required
          onChange={onChangeHandler}
          placeholder="Comment"
          className="bg-blue-100 rounded-2xl w-full px-8 py-5 mb-6"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-57.5 h-15 bg-blue-600 text-white rounded-full font-semibold"
          >
            SUBMIT
          </button>
        </div>
      </form>
      <Subscribe/>
      <Footer />
    </div>
  );
};

export default page;
