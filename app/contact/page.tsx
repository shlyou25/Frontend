'use client'
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import Footer from '@/components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import NavbarComponenet from '@/components/NavbarComponenet'
import Loader from '@/components/Loader';

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
    subject: 'New Submisson On the Contact Form'
  });
  const [loaderStatus, setLoaderStatus] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoaderStatus(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_apiLink}email/sendemail`, {
        name: userData.name,
        email: userData.email,
        message: userData.message,
        subject: userData.subject,
      });
      toast.success(res?.data?.message);
    } catch (err: any) {
      toast.error(err?.response?.data.message || "An unexpected error occurred", {
        position: 'top-right',
      });
    } finally {
      setLoaderStatus(false);
    }
  }
  if (loaderStatus) return <Loader />
  return (
    <div className='lg:pl-[10%] lg:pr-[10%] lg:pt-9'>
      <NavbarComponenet colorText="Let's Star" plainText="t the conversation" IsParaText={true} ParaText="As a user-centric platfrom, we value your feedback.
        Reach out via the form or email us at info@domz.com - We'll respond promptly" searchbarStatus={false} />
      <form onSubmit={onSubmitHandler} className="max-w-[680px] mx-auto pt-6 px-4 md:px-0">
        <h2 className="text-center text-[2rem] font-bold mb-3 leading-tight select-none">
          <span className="text-blue-600 font-bold">Your questions</span> and feedback matter.
        </h2>
        <div className="mb-8">
          <label className="block mb-3 text-[1rem] font-semibold text-black select-none ml-2">
            Name<span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            name='name'
            className="bg-blue-100 border-none text-[1.15rem] rounded-2xl block w-full px-8 py-5 shadow-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-8">
          <label className="block mb-3 text-[1rem] font-semibold text-black select-none ml-2">
            Email<span className="text-blue-600">*</span>
          </label>
          <input
            type="email"
            className="bg-blue-100 border-none text-[1.15rem] rounded-2xl block w-full px-8 py-5 shadow-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
            required
            name='email'
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="comment" className="block mb-3 text-[1rem] font-semibold text-black select-none ml-2">
            Comment<span className="text-blue-600">*</span>
          </label>
          <textarea
            className="bg-blue-100 border-none text-[1.15rem] rounded-2xl block w-full px-8 py-5 shadow-none placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400"
            required
            name='message'
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[230px] h-[60px] flex items-center justify-center text-white text-[1.15rem] bg-linear-to-r from-blue-500 to-blue-600 font-semibold rounded-full tracking-[1px] shadow-lg border-none hover:from-blue-600 hover:to-blue-700 focus:outline-none"
            style={{ letterSpacing: "1px" }}
          >
            SUBMIT
          </button>
        </div>
      </form>
      <div className="mx-auto my-20 max-w-6xl px-4">
        <div
          className="relative rounded-4xl bg-linear-to-br from-[#2264e9] to-[#1858ca] overflow-hidden px-10 py-20 flex flex-col items-center shadow-2xl"
          style={{ minHeight: "340px" }}
        >
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            fill="none"
            viewBox="0 0 1100 340"
            style={{ opacity: 0.17 }}
          >
            <rect x="200" y="75" width="250" height="175" rx="20" stroke="white" strokeWidth="3" fill="none" />
            <rect x="500" y="83" width="200" height="160" rx="18" stroke="white" strokeWidth="2" fill="none" />
            <ellipse cx="340" cy="190" rx="18" ry="7" stroke="white" strokeWidth="2" fill="none" />
          </svg>

          <h2 className="text-white text-center font-bold text-[2.6rem] leading-tight mb-4 drop-shadow">
            Stay Updated
          </h2>
          <p className="text-white text-center text-lg font-medium mb-8 max-w-xl opacity-90">
            Get news, announcements, and highlighted names when our newsletter launches.
          </p>
          <button
            type="button"
            className="px-8 py-3 rounded-full bg-linear-to-r from-[#2264e9] to-[#1858ca] text-white text-lg font-semibold shadow-lg hover:from-[#1858ca] hover:to-[#2264e9] transition-all cursor-pointer"
            style={{ letterSpacing: "0.5px" }}
          >
            Subscribe Now
          </button>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default page