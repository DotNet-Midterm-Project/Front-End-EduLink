import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Field from "../../Components/Common/Field";
import { InputTypes } from "../../utils/constatnts";
import { motion } from "framer-motion";
import eduLinkLogo from "../../assets/eduLinkLogo.png";
import bg from "../../assets/bg.mp4";
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../Redux/Slices/authSlice';
import { useAuth } from "../../Context/auth";

export default function ResetPassword() {
  // const[resetPassword]=useAuth();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false); // New state to handle error styling
  useEffect(() => {
  
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get("token");
    const emailFromURL = queryParams.get("email");

    if (tokenFromURL) {
      setToken(tokenFromURL);
      setEmail(emailFromURL);
    }
  }, [location.search]);
  const handleSubmit =async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setStatusMessage('Passwords do not match.');
      setIsError(true);
      
      return;
    }
console.log(newPassword,confirmPassword,email,token);
    // Dispatch the reset password action
    dispatch(resetPassword({ newPassword, confirmPassword,email,token})).then((action) => {
      if (resetPassword.fulfilled.match(action)) {
        setStatusMessage('Password reset successful!');
        setIsError(false);
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful reset
        }, 2000);
      } else {
        setStatusMessage('Failed to reset password. Please try again.');
        setIsError(true);
      }
    });
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
          Reset Password
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Field
            label="New Password"
            type={InputTypes.PASSWORD}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Field
            label="Confirm Password"
            type={InputTypes.PASSWORD}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {statusMessage && (
            <div
              className={`p-3 text-center rounded-md ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
            >
              {statusMessage}
            </div>
          )}

          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              Reset Password
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
