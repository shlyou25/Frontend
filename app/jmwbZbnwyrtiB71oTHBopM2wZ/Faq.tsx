'use client';
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import AllFaq from "./AllFaq";

export const Faq_Category = ['Sell','Buy','Plans','Security']
interface FaqForm {
  question: string;
  answer: string;
  priorityNumber: number;
  category: string;
}

const Faq = () => {
  const [faq, setFaq] = useState<FaqForm>({
    question: "",
    answer: "",
    priorityNumber: 0,
    category: ""
  });
  const [isAllFaq, setIsAllFaq] = useState('createFaq')
  const onChangeHandler = (
    e: React.ChangeEvent< HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFaq((prev) => ({
      ...prev,
      [name]:
        name === "priorityNumber" ? Number(value) : value,
    }));
  };

  const onSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_apiLink}faq/create`,
        faq,
        { withCredentials: true }
      );
      toast.success(res?.data.message);
      // Reset form
      setFaq({
        question: "",
        answer: "",
        priorityNumber: 0,
        category: ""
      });
    } catch (err: any) {
      toast.error(
        err.response.data.message ||
        "An unexpected error occurred"
      );
    }
  };
  if (isAllFaq === 'view') return <AllFaq setIsAllFaq={setIsAllFaq} />
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  FAQ
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  This is all the FAQ created
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition w-full sm:w-auto
                cursor-pointer"
                onClick={() => setIsAllFaq('view')}
              >
                View All FAQ

              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-6">
              {/* QUESTION */}
              
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  name="category"
                  value={faq.category}
                  onChange={onChangeHandler}
                  required
                  className="mt-2 block w-full rounded-md border px-3 py-2 bg-white"
                >
                  <option value="" disabled>
                    Select Category
                  </option>

                  {Faq_Category.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium text-gray-900">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={faq.question}
                  onChange={onChangeHandler}
                  placeholder="What is FAQ?"
                  required
                  className="mt-2 block w-full rounded-md border px-3 py-2"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-900">
                  Priority Number
                </label>
                <input
                  type="number"
                  name="priorityNumber"
                  value={faq.priorityNumber}
                  onChange={onChangeHandler}
                  required
                  className="mt-2 block w-full rounded-md border px-3 py-2"
                />
              </div>

              {/* ANSWER */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-900">
                  Answer
                </label>
                <textarea
                  name="answer"
                  rows={5}
                  value={faq.answer}
                  onChange={onChangeHandler}
                  required
                  className="mt-2 block w-full rounded-md border px-3 py-2"
                  placeholder="FAQ stands for Frequently Asked Questions..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Faq;
