import { useRef, useEffect, useState } from "react";
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
    <section className="min-h-screen flex flex-col items-center justify-start overflow-y-auto relative bg-gray-100 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
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

      {/* Add Space Between Header and Form */}
      <div className="h-20"></div>

      {/* Sign-Up Box */}
      <div className="w-full max-w-3xl p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg z-20 overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={eduLinkLogo} alt="EduLink Logo" className="w-20 h-auto" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl font-bold text-center text-[#0D47A1] mb-2">
          Join Our Community
        </h1>
        <p className="text-sm text-center text-[#0D47A1] mb-8">
          Empower Your Learning Journey
        </p>

        {/* Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
          ref={registerReference}
        >
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-black mb-1"
            >
              Username
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              placeholder="Enter your userName"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Enter your confirmPassword"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-black mb-1"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="Enter your phoneNumber"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-black mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              required
              className="w-full p-2 bg-white bg-opacity-20 text-gray-900 border border-white border-opacity-50 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-black mb-1"
            >
              Skills
            </label>
            <input
              id="skills"
              type="text"
              name="skills"
              placeholder="Enter your skills"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="departmentID"
              className="block text-sm font-medium text-black mb-1"
            >
              Department
            </label>
            <select
              id="departmentID"
              name="departmentID"
              required
              className="w-full p-2 bg-white bg-opacity-20 text-gray-900 border border-white border-opacity-50 rounded-md focus:ring-2 focus:ring-blue-500"
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
              className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? "Registering..." : "Create Account"}    
            </motion.button>
          </div>
        </form>



        <p className="mt-6 text-sm text-center text-gray-700">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            LogIn
          </Link>
        </p>
      </div>
    </section>
  );
}
