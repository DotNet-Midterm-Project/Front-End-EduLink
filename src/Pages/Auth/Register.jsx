import  { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import Field from "../../Components/Common/Field";
import { InputTypes } from "../../utils/constatnts";
import { motion } from "framer-motion";
import eduLinkLogo from "../../assets/eduLinkLogo.png"; // Import the logo
import bg from "../../assets/bg.mp4";
import { toast } from "react-toastify";

export default function Register() {
  const registerReference = useRef(null);
  const { registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const departments = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Information Technology" },
    { id: 3, name: "Software Engineering" },
    { id: 4, name: "Cybersecurity" },
  ];

  useEffect(() => {
    // Add a class to the body to handle the video background
    document.body.classList.add("has-video-bg");
    return () => {
      document.body.classList.remove("has-video-bg");
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(registerReference.current);
    const data = Object.fromEntries(formData);
    data.departmentID = parseInt(data.departmentID);

    try {
      await registerUser(data);
      toast.success("Registration successful! Please verify your email.");
      navigate("/verify");
      registerReference.current.reset();
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-h-screen  flex items-center justify-center overflow-hidden relative">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0  min-w-full min-h-full max-w-none object-cover"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block absolute mt-20 left-10 z-20 text-white"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl font-bold mb-4"
        >
          Welcome to EduLink!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl font-light"
        >
          Empower Your Learning Journey
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 bg-white bg-opacity-30  backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl z-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center "
        >
          <motion.img
            src={eduLinkLogo}
            alt="EduLink Logo"
            className="w-50 h-auto m-auto "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>
        <h1 className="text-5xl font-bold text-center text-white mb-3">
          Join Our Community
        </h1>

        <form
          className=" grid grid-cols-1 md:grid-cols-2 gap-4  "
          onSubmit={handleSubmit}
          ref={registerReference}
        >
          <Field
            label="Username"
            type={InputTypes.TEXT}
            name="userName"
            required
          />
          <Field label="Email" type={InputTypes.EMAIL} name="email" required />
          <Field
            label="Password"
            type={InputTypes.PASSWORD}
            name="password"
            required
          />
          <Field
            label="Confirm Password"
            type={InputTypes.PASSWORD}
            name="confirmPassword"
            required
          />
          <Field
            label="Phone Number"
            type={InputTypes.PHONE}
            name="phoneNumber"
            required
          
          />
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-white mb-1"
            >
              Gender
            </label>
            <select
              name="gender"
              className="w-full p-2 bg-white bg-opacity-20 text-gray-900 border border-white border-opacity-50 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Field
            label="Skills"
            type={InputTypes.TEXT}
            name="skills"
            required
          
          />
          <div>
            <label
              htmlFor="departmentID"
              className="block text-sm font-medium text-white mb-1"
            >
              Department
            </label>
            <select
              name="departmentID"
              className="w-full p-2 bg-white bg-opacity-20 text-gray-900 border border-white border-opacity-50 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}>
             {isLoading ? 'Registering...' : 'Start Your Journey'}
            </motion.button>
          </div>
        </form>

        <p className="mt-8 text-center text-white">
          Already a member? {" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 font-bold transition-colors duration-300"
          >
            LogIn
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
