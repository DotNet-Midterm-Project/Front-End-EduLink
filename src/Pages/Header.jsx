import { Link } from "react-router-dom";
import Edud from "../assets/Home/Edud.png";
import { useState, useEffect } from "react";
import SideBar from "../Components/Student/SideBar";
import { yourProfile } from "../assets";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setRoles(JSON.parse(localStorage.getItem("roles") || "[]"));
  }, [localStorage.getItem("token"), localStorage.getItem("roles")]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRoles(JSON.parse(localStorage.getItem("roles") || "[]"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  return (
    <header className="absolute w-full z-50 px-8">
      <div className="z-30">
        <div className={`flex items-center justify-between h-20 font-bold`}>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12">
              <img
                src={Edud}
                alt="EduLink Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-white">
              <span className="text-orange-400">Edu</span>Link
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center duration-300 space-x-8 text-xl">
            {!isLoggedIn && !roles.includes("Student") ? (
              <>
                <Link
                  to="/"
                  className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"
                >
                  About us
                </Link>
                <Link
                  to="/articles"
                  className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"
                >
                  Articles
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"
                >
                  Contact us
                </Link>
              </>
            ) : (
              <div className="relativ space-x-4">
                <div className="absolute top-6 ml-44 space-x-4">
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
              </div>
            )}
          </nav>

          {/* Login Button or SideBar Icon */}
          <div className="hidden md:block">
            {isLoggedIn && roles.includes("Student") ? (
              <>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <img
                    src={yourProfile}
                    className="h-8 w-8 align-middle hover:text-[#F28E33]"
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
          <div className="md:hidden bg-orange-500">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-orange-500">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
              >
                About us
              </Link>
              <Link
                to="/articles"
                className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
              >
                Articles
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
              >
                Contact us
              </Link>
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="block w-full bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-colors mt-4 text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
