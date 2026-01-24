'use client';

import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

import Footer from '@/components/Footer';
import NavbarComponenet from '@/components/NavbarComponenet';
import Loader from '@/components/Loader';
import Modal from '@/components/model';

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

  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
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
        {
          name: userData.name,
          email: userData.email,
          message: userData.message,
          subject: userData.subject,
        }
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

  const handleSubscribe = async () => {
    if (!subscribeEmail) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setLoaderStatus(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}subscribe`,
        { email: subscribeEmail }
      );

      toast.success(res?.data?.message || 'Subscribed successfully 🎉');
      setSubscribeEmail('');
      setIsSubscribeModalOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'Subscription failed'
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
        IsParaText={true}
        ParaText="As a user-centric platfrom, we value your feedback.
        Reach out via the form or email us at info@domz.com - We'll respond promptly"
        searchbarStatus={false}
      />
      <form
        onSubmit={onSubmitHandler}
        className="max-w-170 mx-auto pt-6 px-4 md:px-0"
      >
        <h2 className="text-center text-[2rem] font-bold mb-3 leading-tight select-none">
          <span className="text-blue-600 font-bold">Your questions</span> and
          feedback matter.
        </h2>

        <div className="mb-8">
          <label className="block mb-3 text-[1rem] font-semibold ml-2">
            Name<span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            onChange={onChangeHandler}
            className="bg-blue-100 rounded-2xl w-full px-8 py-5"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-3 text-[1rem] font-semibold ml-2">
            Email<span className="text-blue-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={onChangeHandler}
            className="bg-blue-100 rounded-2xl w-full px-8 py-5"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-3 text-[1rem] font-semibold ml-2">
            Comment<span className="text-blue-600">*</span>
          </label>
          <textarea
            name="message"
            required
            onChange={onChangeHandler}
            className="bg-blue-100 rounded-2xl w-full px-8 py-5"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-57.5 h-15 text-white bg-blue-600 rounded-full font-semibold"
          >
            SUBMIT
          </button>
        </div>
      </form>
      <div className="mx-auto my-20 max-w-6xl px-4">
        <div className="rounded-4xl bg-blue-600 px-10 py-20 text-center text-white shadow-2xl">
          <h2 className="text-[2.6rem] font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Get news, announcements, and highlighted names when our newsletter
            launches.
          </p>

          <button
            type="button"
            onClick={() => setIsSubscribeModalOpen(true)}
            className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100"
          >
            Subscribe Now
          </button>
        </div>
      </div>
      <Modal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
        title="Subscribe to Newsletter"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter your email to receive updates and announcements.
          </p>

          <input
            type="email"
            value={subscribeEmail}
            onChange={(e) => setSubscribeEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border px-4 py-3"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsSubscribeModalOpen(false)}
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSubscribe}
              className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default page;
