import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../../assets/bg.mp4";

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  // Function to redirect to the login page
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay to enhance content visibility */}
      <div className="absolute inset-0 bg-black opacity-40 z-10 "></div>

      {/* Main content container */}
      <div className="relative z-20 bg-white bg-opacity-80 p-8 shadow-lg rounded-lg min-w-mid max-w-lg  min-h-mid max-h-mid text-center backdrop-filter backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">Email Verification Required</h1>
        <p className="text-gray-700 mb-6">
          Thank you for registering! Please check your email to verify your account.
        </p>
        <p className="text-gray-700 mb-6">
          Once your account is verified, click the button below to proceed to login.
        </p>
        <div className="mb-6">
          <a 
            href="https://mail.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            Open your email
          </a>
        </div>
        <button 
          onClick={handleLoginRedirect} 
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Login
        </button>
      </div>
    </section>
  );
};

export default VerifyEmailPage;
