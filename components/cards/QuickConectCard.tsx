import Link from 'next/link';
import React from 'react'

interface QuickConectCardInterface {
    title: string;
    description: string;
    mainButton: string;
    subButton: Boolean;
}

const QuickConectCard = (props: QuickConectCardInterface) => {
    return (
        <section className="flex justify-center py-20 px-4 overflow-x-hidden">
            <div className="w-full max-w-full md:max-w-6xl text-center rounded-3xl p-8 md:p-12 shadow-lg bg-[url(/assets/getstarted.webp)] bg-cover">
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                    {props?.title}
                </h2>
                <p className="text-blue-100 text-base md:text-lg mb-8">
                    {props?.description}
                </p>
                {props?.mainButton ? (
                    <Link href="/plan">
                        <button className="bg-blue-600 text-white font-medium px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer">
                            {props.mainButton}
                        </button>
                    </Link>
                ) : null}
                {props?.subButton &&
                    <div className="flex justify-center items-center gap-8 mt-10 text-white flex-wrap md:flex-nowrap">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white shadow">
                                <img src="/assets/icons/freetrail.webp" alt="Free Trial" className="w-6 h-6" />
                            </span>
                            <span className="text-lg">Free Trial</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white shadow">
                                <img src="/assets/icons/cancel.webp" alt="Cancel Anytime" className="w-6 h-6" />
                            </span>
                            <span className="text-lg">Cancel Anytime</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white shadow">
                                <img src="/assets/icons/user.webp" alt="Brokers Account" className="w-6 h-6" />
                            </span>
                            <span className="text-lg">Brokers Account</span>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default QuickConectCard