import { Link } from "react-router-dom";
import Edud from "../assets/Home/Edud.png";
import { useState, useEffect } from "react";
import SideBar from "../Components/Student/SideBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [roles, setRoles] = useState([]);
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  useEffect(() => {
    // setRoles(storedRoles);
    setIsLoggedIn(!!roles);
  }, []);
  // console.log(roles[0]);

  // const isStudent = roles.includes("Student");
  // const isVolunteer = roles.includes("Volunteer");

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
            {isLoggedIn && roles[0] == "Student" ? (
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <svg
                  className=" h-8 w-8 align-middle hover:text-[#F28E33]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#ffffff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Login
              </Link>
            )}
            {isSidebarOpen && (
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
