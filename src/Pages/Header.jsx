import { Link, useLocation } from "react-router-dom";
import Edud from "../assets/Home/Edud.png";
import { useState, useEffect } from "react";
import SideBar from "../Components/Student/SideBar";
import { yourProfile } from "../assets";
 
const NavLink = ({ link, children, className }) => {
  const location = useLocation();
  const currentPath = location.pathname; 
  return (
    <Link
      to={link}
      className={`transition-all duration-75 transform hover:scale-105 ${className} ${
        currentPath === link
          ? "border-b-2 border-orange-400 font-bold"
          : ""
      }`}
    >
      {children}
    </Link>
  );
};
 
export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [roles, setRoles] = useState([]);
 
  // Determine if the current page should use the special font color
  const isSpecialPage =
    location.pathname === "/contact-us" ||
    location.pathname === "/articles" ||
    location.pathname === "/about-us";
    let profileImage = localStorage.getItem("avatarPreview");
    if (!profileImage || profileImage === "null") {
      profileImage = yourProfile; // Replace `yourProfile` with a default image URL or variable.
    }else{
      profileImage = `${import.meta.env.VITE_URL_BACKEND}/Resources/${profileImage}`;
    }
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setRoles(JSON.parse(localStorage.getItem("roles") || "[]"));
  }, [localStorage.getItem("token"), localStorage.getItem("roles")]);
 
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
 
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRoles(JSON.parse(localStorage.getItem("roles") || "[]"));
    };
 
    handleStorageChange(); // Initialize values on mount
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", handleStorageChange);
 
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
 
  return (
    <header
      className={`fixed w-full z-50 px-8 transition-all duration-300 top-0 left-0 right-0 ${
        isScrolled ? "bg-[#0D47A1] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="z-30">
        <div className="flex items-center justify-between h-20 font-semibold">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-[60px] h-[55px]">
              <img
                src={Edud}
                alt="EduLink Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
 
          {/* Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center duration-300 space-x-8 text-sm ${
              isScrolled
                ? isSpecialPage
                  ? "text-[#0B102F]"
                  : "text-[#0B102F]"
                : isSpecialPage
                ? "text-[#0B102F]"
                : "text-gray-200"
            }`}
          >
            {!isLoggedIn && !roles.includes("Student") ? (
              <>
                <NavLink link="/" className={isSpecialPage ? "text-[#0B102F]" : ""}>Home</NavLink>
                <NavLink link="/about-us" className={isSpecialPage ? "text-[#0B102F]" : ""}>About us</NavLink>
                <NavLink link="/articles" className={isSpecialPage ? "text-[#0B102F]" : ""}>Articles</NavLink>
                <NavLink link="/contact-us" className={isSpecialPage ? "text-[#0B102F]" : ""}>Contact us</NavLink>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/profile"
                  className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"
                >
                  Profile Settings
                </Link>
                <Link
                  to="/"
                  className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"
                >
                  Home page
                </Link>
              </div>
            )}
          </nav>
 
          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && roles.includes("Student") ? (
              <>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-8 w-8 align-middle hover:text-[#F28E33] bg-[#0B102F]"
                  />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Login
              </Link>
            )}
            {isLoggedIn && roles.includes("Student") && isSidebarOpen && (
              <SideBar onClose={() => setIsSidebarOpen(false)} />
            )}
          </div>
 
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 transition-transform duration-300 ease-in-out transform hover:scale-105"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
 
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg rounded-md">
              <NavLink link="/" className={isSpecialPage ? "text-[#0B102F]" : ""}>Home</NavLink>
              <NavLink link="/about-us" className={isSpecialPage ? "text-[#0B102F]" : ""}>About us</NavLink>
              <NavLink link="/articles" className={isSpecialPage ? "text-[#0B102F]" : ""}>Articles</NavLink>
              <NavLink link="/contact-us" className={isSpecialPage ? "text-[#0B102F]" : ""}>Contact us</NavLink>
              <Link
                to="/login"
                className="block bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300 mt-4"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}