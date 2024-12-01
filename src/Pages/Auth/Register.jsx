import  { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import Field from "../../Components/Common/Field";
import { InputTypes } from "../../utils/constatnts";
import { motion } from "framer-motion";
import EduLinkImage from "../../assets/Home/EduLinkImage.png";
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
    { id: 5, name: "Artificial Intelligence" },
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
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="w-full max-w-3xl h-[calc(100vh-4rem)] p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl z-20 overflow-y-auto"
>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center "
        >
          <motion.img
            src={EduLinkImage}
            alt="EduLinkImage"
            className="w-[90px] h-[80px]"
            whileHover={{ scale: 1.1 }}
          />
        </motion.div>
        <br></br>
        <dev>
        <h1 className="text-3xl font-bold text-center text-[#F07E12] mb-2">
        Join Our Community
</h1>
<p className="text-lg text-center text-[0B102F] mb-4">
Empower Your Learning Journey With Us!
</p>
        </dev>
        

        <form
  className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-stretch"
  onSubmit={handleSubmit}
  ref={registerReference}
>
  <Field
    label={<span className="text-[#0B102F]">Username</span>}
    type={InputTypes.TEXT}
    name="userName"
    required
    className="w-full"
  />
  <Field
    label={<span className="text-[#0B102F]">Email</span>}
    type={InputTypes.EMAIL}
    name="email"
    required
    className="w-full"
  />
  <Field
    label={<span className="text-[#0B102F]">Password</span>}
    type={InputTypes.PASSWORD}
    name="password"
    required
    className="w-full"
  />
  <Field
    label={<span className="text-[#0B102F]">Confirm Password</span>}
    type={InputTypes.PASSWORD}
    name="confirmPassword"
    required
    className="w-full"
  />
  <Field
    label={<span className="text-[#0B102F]">Phone Number</span>}
    type={InputTypes.PHONE}
    name="phoneNumber"
    required
    className="w-full"
  />
  
  <div className="w-full">
    <label
      htmlFor="gender"
      className="block text-sm font-medium text-[#0B102F] mb-1"
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
    </select>
  </div>

  <Field
    label={<span className="text-[#0B102F]">Skills</span>}
    type={InputTypes.TEXT}
    name="skills"
    required
    className="w-full"
  />
  
  <div className="w-full">
    <label
      htmlFor="departmentID"
      className="block text-sm font-medium text-[#0B102F] mb-1"
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
      type="submit"
      disabled={isLoading}
      className={`bg-gradient-to-r from-[#CF6500] to-[#FF9C41] text-white w-[200px] h-[50px] 
        rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center 
        justify-center text-lg font-normal hover:font-semibold hover:scale-110 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
    >
      {isLoading ? 'Registering...' : 'Start Your Journey'}
    </motion.button>
  </div>
</form>




<p className="mt-8 text-center text-white">
  Already a member?{"  "}
  <Link
    to="/login"
    className="text-[#0B102F] hover:text-blue-500 border-b border-[#0B102F]"
  >
           Login Into Your Account
            </Link>
</p>

      </motion.div>
    </section>
  );
}
