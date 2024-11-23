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
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl z-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <motion.img
            src={eduLinkLogo}
            alt="EduLink Logo"
            className="w-40 h-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>

        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Welcome Back
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 mb-4 text-sm font-bold text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-md">
              {error || "Invalid credentials. Please try again."}
            </div>
          )}

          <Field
            label="Email"
            type={InputTypes.EMAIL}
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            label="Password"
            type={InputTypes.PASSWORD}
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors duration-300"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </div>
        </form>

        <p className="mt-8 text-center text-white">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-300"
          >
            Register
          </Link>
        </p>
      </motion.div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-20"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 mb-4">
              Reset Password
            </Dialog.Title>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {resetStatus.message && (
                <div
                  className={`p-3 rounded-md font-semibold ${
                    resetStatus.type === "success"
                      ? "bg-green-100 text-green-700 border-green-400"
                      : "bg-red-100 text-red-700 border-red-400"
                  }`}
                >
                  {resetStatus.message}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}
