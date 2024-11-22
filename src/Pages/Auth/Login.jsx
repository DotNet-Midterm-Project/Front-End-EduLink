import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Slices/authSlice";
import Field from "../../Components/Common/Field";
import { InputTypes } from "../../utils/constatnts";
import { motion } from "framer-motion";
import eduLinkLogo from "../../assets/eduLinkLogo.png";
import bg from "../../assets/bg.mp4";
import { Dialog } from "@headlessui/react";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetStatus, setResetStatus] = useState({ type: "", message: "" });
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password })).then((action) => {
      if (login.fulfilled.match(action)) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You will be redirected shortly...",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        setTimeout(() => {
          const roles = JSON.parse(localStorage.getItem("roles")) || [];

          if (roles.includes("Admin")) {
            navigate("/admin");
          } else if (roles.includes("Student")) {
            navigate("/student-page");
          } else {
            navigate("/"); // Default redirection
          }
        }, 2000);
      }
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Call your forgot password API
      setResetStatus({
        type: "success",
        message: "Reset link sent to your email!",
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setResetStatus({ type: "", message: "" });
      }, 2000);
    } catch (error) {
      setResetStatus({
        type: "error",
        message: "Failed to send reset link. Please try again.",
      });
    }
  };

  useEffect(() => {
    document.body.classList.add("has-video-bg");
    return () => {
      document.body.classList.remove("has-video-bg");
    };
  }, []);



  return (

    <section className="min-h-screen flex flex-col items-center justify-center relative bg-gray-100 overflow-y-auto">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Add Scrollbar styling */}
      <style jsx>{`
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(200, 200, 200, 0.3); /* Light gray track */
    }
    ::-webkit-scrollbar-thumb {
      background: gray; /* Gray scrollbar */
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: darkgray; /* Darker gray on hover */
    }
  `}</style>

      {/* Login Box */}
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg z-20">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={eduLinkLogo}
            alt="EduLink Logo"
            className="w-20 h-auto"
          />
        </div>

        {/* Welcome Text */}
        <h1 className="text-xl font-bold text-center text-[#0D47A1] mb-2">
          Welcome to EduLink!
        </h1>
        <p className="text-sm text-center text-[#0D47A1] mb-10">
          Empower Your Learning Journey
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2">Remember me for 30 days</span>
            </label>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Create New Account
          </Link>
        </p>
      </div>
    </section>


  );
}