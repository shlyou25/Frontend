import { useEffect, useState } from "react";
import { SelectedFaq } from "./AllFaq";
import axios from "axios";
import { toast } from "react-toastify";
import { Faq_Category } from "./Faq";


interface EditFaqProps {
  selectedFaq: SelectedFaq | null;
  onClose: () => void;
  onSuccess: () => void;
}

export interface FaqForm {
  id: string
  question: string;
  answer: string;
  priorityNumber: number;
  category?: string;
}

const EditFaq = ({ selectedFaq, onClose, onSuccess }: EditFaqProps) => {
  if (!selectedFaq) return null;
  const [faq, setFaq] = useState<FaqForm>({
    id: selectedFaq.id,
    question: "",
    answer: "",
    priorityNumber: 0,
    category: "",
  });

  useEffect(() => {
    if (selectedFaq) {
      setFaq({
        id: selectedFaq.id,
        question: selectedFaq.question,
        answer: selectedFaq.answer,
        priorityNumber: selectedFaq.priorityNumber,
        category: selectedFaq.category,
      });
    }
  }, [selectedFaq]);
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>
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
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_apiLink}faq/update`,
        faq,
        { withCredentials: true }
      );
      toast.success(res?.data.message);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 3000);
      // Reset form
      setFaq({
        id: "",
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

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <p className="mt-1 text-sm/6 text-gray-600">This Faq will be displayed on Landing Page</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">Question</label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input type="text" placeholder="what is ...." className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      name="question"
                      onChange={onChangeHandler}
                      value={faq?.question}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">Answer</label>
                <div className="mt-2">
                  <textarea rows={3} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    placeholder="Faq is ...."
                    name="answer"
                    value={faq?.answer}
                    onChange={onChangeHandler}
                  ></textarea>
                </div>
              </div>
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
                <label className="block text-sm/6 font-medium text-gray-900">Priority Number</label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input type="number" placeholder="1 , 2, ...." className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      name="priorityNumber"
                      value={faq?.priorityNumber}
                      min={1}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
      </form>

    </>
  )
}
export default EditFaq