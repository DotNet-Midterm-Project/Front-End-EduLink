import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

const apiBaseUrl = import.meta.env.VITE_SERVER_URL;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const apiUrlRegister = `${apiBaseUrl}/api/Account/register-student`;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      console.log(apiUrlRegister);
      const res = await axios.post(apiUrlRegister, userData);
    
      if (res.data.success) {

        toast.success("Registration successful! Please check your email to verify your account.");
      } else {
        toast.error(res.data.msg || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed.");
    }
  };

  

  const forgotPassword = async (email) => {
    console.log(email);
    try {
      const res = await axios.post(`${apiBaseUrl}/api/Account/forgot-password`, { email });
      console.log(res);
      if (res.data) {
  
        toast.success("check your Email");
        return result;
      } else {
        toast.error(res.data.msg || "Login failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "reset passowrd  failed.");
    }
  };

 
  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    toast.success("Logout successful!");
  };

  const contextData = {
    token,
    forgotPassword,
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;