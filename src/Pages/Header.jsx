import Edud from  "../assets/Home/Edud.png";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-transparent ">
      <div className="container mx-auto px-4 fixed z-30">
        <div className="flex items-center justify-between h-20 font-bold">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12">
              <img
                src={Edud}
                alt="EduLink Logo"
                className="w-full h-full object-cover "
              />
            </div>
            <span className="text-2xl font-bold text-white">
              <span className="text-orange-400">Edu</span>Link
            </span>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center duration-300  space-x-8 text-xl">
            <a
              href="/"
              className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"


            >
             <span> Home</span>
            </a>
            <a
              href="/about"
              className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"

            >
              About us
            </a>
            <a
              href="/articles"
              className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"

            >
              Articles
            </a>
            <a
              href="/contact"
              className="text-gray-200 hover:text-white transition-all duration-75 transform hover:scale-105"

            >
              Contact us
            </a>
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Login
            </button>
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
              <a
                href="/"
                className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
              >
                About us
              </a>
              <a
                href="/articles"
                className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
              >
                Articles
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-gray-200 hover:text-whitetransition-colors"
              >
                Contact us
              </a>
              <button className="w-full bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-medium transition-colors mt-4">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}