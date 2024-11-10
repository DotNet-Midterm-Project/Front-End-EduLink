import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import Field from "../../Components/Common/Field";
import { InputTypes } from "../../utils/constatnts";
import { motion } from "framer-motion";
import eduLinkLogo from "../../assets/eduLinkLogo.png";
import bg from "../../assets/bg.mp4";
import { Dialog } from '@headlessui/react'

export default function Login() {
  const loginReference = useRef(null);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [resetStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    document.body.classList.add('has-video-bg');
    const params = new URLSearchParams(location.search);
    const type = params.get('userType');
    if (type) {
      setUserType(type);
      console.log(type);
    }
    return () => {
      document.body.classList.remove('has-video-bg');
    };
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginReference.current);
    const data = Object.fromEntries(formData);
    data.userType = userType;

    console.log(userType); // Debugging

    try {
      const response = await loginUser(data);
      console.log(response); // Debugging

      if (response.data.success) {
        localStorage.setItem("Email", data.Email);
        loginReference.current.reset();
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // try {
    //   // Assuming you have a forgotPassword function in your auth context
    //   const response = await forgotPassword(email);
    //   setResetStatus({
    //     type: 'success',
    //     message: 'Reset link sent to your email!'
    //   });
    //   setTimeout(() => {
    //     setIsModalOpen(false);
    //     setResetStatus({ type: '', message: '' });
    //   }, 2000);
    // } catch (error) {
    //   setResetStatus({
    //     type: 'error',
    //     message: 'Failed to send reset link. Please try again.'
    //   });
    // }
  };

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

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          ref={loginReference}
        >
          <Field label="Email" type={InputTypes.EMAIL} name="Email" required />
          <Field label="Password" type={InputTypes.PASSWORD} name="Password" required />
          
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              Login
            </motion.button>
          </div>
        </form>

        <p className="mt-8 text-center text-white">
          Dont have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-300">
            Register
          </Link>
        </p>
      </motion.div>

      {/* Forgot Password Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-20"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {resetStatus.message && (
                <div className={`p-3 rounded-md ${
                  resetStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {resetStatus.message}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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