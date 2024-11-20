import { Link, useLocation } from "react-router-dom";
import Edud from "../assets/Home/Edud.png";
import { useState, useEffect } from "react";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <a
      href={to}
      className={`transition-all duration-75 transform hover:scale-105 ${
        currentPath === to
          ? "border-b-2 border-orange-400 font-bold" // جعل النص عريضًا عند التواجد في الصفحة
          : ""
      }`}
    >
      {children}
    </a>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Change background when scrolled down
      } else {
        setIsScrolled(false); // Revert to original state when at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get the current path
  const location = useLocation();

  // Check if the current page is "About Us"
  const isAboutPage = location.pathname === "/about-us";

  return (
    <header
      className={`fixed w-full z-50 px-8 transition-all duration-300 top-0 left-0 right-0 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
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
              isScrolled ? "text-[#0B102F]" : "text-gray-200"
            }`}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About us</NavLink>
            <NavLink to="/articles">Articles</NavLink>
            <NavLink to="/contact">Contact us</NavLink>
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link
              to={"/login"}

              className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-1 rounded-[10px] font-medium transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden bg-gradient-to-r from-orange-500 to-orange-600 shadow-md rounded-md">
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
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About us</NavLink>
              <NavLink to="/articles">Articles</NavLink>
              <NavLink to="/contact">Contact us</NavLink>
              <button className="w-full bg-orange-400 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300 mt-4 shadow-md">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}