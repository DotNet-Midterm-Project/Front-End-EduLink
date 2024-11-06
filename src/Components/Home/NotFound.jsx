// NotFound.jsx

import { Link } from "react-router-dom";

export default function NotFound () {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <Link
        to="/"
        className="text-orange-500 hover:text-orange-700 font-semibold text-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};