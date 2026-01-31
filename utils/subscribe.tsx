import Loader from "../components/Loader";
import Modal from "@/components/model";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Subscribe = () => {
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
    const [subscribeEmail, setSubscribeEmail] = useState('');

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_apiLink}auth/me`,
                    { withCredentials: true }
                );

                if (res.data?.user) {
                    setIsLoggedIn(true);
                }
            } catch {
                setIsLoggedIn(false);
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuthStatus();
    }, []);
    const subscribeLoggedInUser = async () => {
        try {
            setLoaderStatus(true);

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_apiLink}subscribe`,
                {},
                { withCredentials: true }
            );

            toast.success(res?.data?.message || 'Subscribed successfully 🎉');
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message || 'Subscription failed'
            );
        } finally {
            setLoaderStatus(false);
        }
    };
    const subscribeGuestUser = async () => {
        if (!subscribeEmail) {
            toast.error('Please enter your email');
            return;
        }

        try {
            setLoaderStatus(true);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_apiLink}subscribe`,
                { email: subscribeEmail },
                { withCredentials: true }
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
    const handleSubscribeClick = async () => {
        if (isLoggedIn) {
            await subscribeLoggedInUser();
            return;
        }
        setIsSubscribeModalOpen(true);
    };
    if (!authChecked || loaderStatus) return <Loader />;
    return (
        <>
            <div className="mx-auto my-20 max-w-6xl px-4 text-center">
                <div className="rounded-4xl bg-blue-600 px-10 py-20 text-white shadow-2xl">
                    <h2 className="text-[2.6rem] font-bold mb-4">Stay Updated</h2>
                    <p className="mb-8">
                        Get news and announcements when our newsletter launches.
                    </p>

                    <button
                        type="button"
                        onClick={handleSubscribeClick}
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
                    <input
                        type="email"
                        value={subscribeEmail}
                        onChange={(e) => setSubscribeEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsSubscribeModalOpen(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={subscribeGuestUser}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Subscribe;