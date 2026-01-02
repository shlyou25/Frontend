import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      
      {/* Illustration */}
      <div className="mb-10">
        <img
          src="/assets/error.svg"
          alt="404 Illustration"
          className="mx-auto max-w-105 w-full"
        />
      </div>

      {/* 404 Text */}
      <p className="text-blue-600 font-semibold text-lg mb-2">
        404 Not Found
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Whoops! That page doesn’t exist.
      </h1>

      <p className="text-gray-500 mb-6">
        Here are some helpful links instead:
      </p>

      {/* Links */}
      <div className="flex gap-6 text-gray-600">
        <Link
          href="/"
          className="underline hover:text-gray-900 transition"
        >
          Home
        </Link>
        <Link
          href="/domainbuy"
          className="underline hover:text-gray-900 transition"
        >
          Buy
        </Link>
        <Link
          href="/contact"
          className="underline hover:text-gray-900 transition"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
