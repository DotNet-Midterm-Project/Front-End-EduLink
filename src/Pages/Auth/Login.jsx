import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import Field from "../../Components/Common/Field";
import { InputTypes } from "../../utils/constatnts";
import { motion } from "framer-motion";
import EduLinkImage from "../../assets/Home/EduLinkImage.png";
import bg from "../../assets/bg.mp4";
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/Slices/authSlice';
import Swal from 'sweetalert2';

export default function Login() {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetStatus, setResetStatus] = useState({ type: '', message: '' });
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((action) => {
      if (login.fulfilled.match(action)) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting...',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        setTimeout(() => {
          navigate('/student-page');
        }, 2000);
      }
    });
  };

  useEffect(() => {
    document.body.classList.add('has-video-bg');
    const params = new URLSearchParams(location.search);
    const type = params.get('userType');
    if (type) {
      console.log(type);
    }
    return () => {
      document.body.classList.remove('has-video-bg');
    };
  }, [location.search]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(resetEmail);
      setResetStatus({
        type: 'success',
        message: 'Reset link sent to your email!'
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setResetStatus({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      setResetStatus({
        type: 'error',
        message: 'Failed to send reset link. Please try again.'
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative bg-gradient-to-br from-gray-800 via-purple-900 to-black">
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

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl z-20"
      >
        <div className="flex justify-center mb-8">
          <motion.img
            src={EduLinkImage}
            alt="EduLinkImage"
            className="w-[100px] h-[90px]"
            whileHover={{ scale: 1.1 }}
          />
        </div>
<div>
<h1 className="text-2xl font-bold text-center text-[#F07E12] mb-4">
  Welcome Back
</h1>
<p className="text-lg text-center text-white">
  We're glad to see you again.
</p>
</div>
       
<br></br>



        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Field

            label="Your email"
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
              className="text-sm text-blue-500 hover:text-blue-200 border-b border-blue-500"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex justify-center mt-6">
  <motion.button
    // whileHover={{ scale: 1.05 }}
    // whileTap={{ scale: 0.95 }}
    type="submit"
    className="bg-gradient-to-r from-[#CF6500] to-[#FF9C41] text-white w-[150px] h-[40px] rounded-lg shadow-lg 
    hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center text-lg font-normal 
    hover:font-semibold hover:scale-110"
    >
    Login
  </motion.button>
</div>

        </form>

        <p className="mt-6 text-center text-white">
          Don't have an account?{"  "}
          <Link to="/register" className="text-blue-300 hover:text-blue-200 border-b border-blue-300]">
            Register
          </Link>
        </p>
      </motion.div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-30">
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Reset Password
            </Dialog.Title>
            <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
              <label className="block text-sm text-gray-700">
                Email Address
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </label>
              {resetStatus.message && (
                <p className={`text-sm ${resetStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {resetStatus.message}
                </p>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
