import { useState } from "react";
import Edud from "../../assets/Home/Edud.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#0B47A9] text-white px-4 py-2">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-14 h-12">
            <img
              src={Edud}
              alt="EduLink Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            type="button"
            className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium"
          >
            Profile Settings
          </button>
          <button
            type="button"
            className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home page
          </button>
          <button
            type="button"
            className="text-white hover:text-white/90 p-2 rounded-full"
            aria-label="Notifications"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z"
                stroke="currentColor"
                strokeWidth="1.5"
              ></path>
              <path
                d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            U
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-full text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M5 17H19M5 12H19M5 7H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile Settings
            </button>
            <button
              type="button"
              className="text-white hover:text-white/90 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home page
            </button>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                type="button"
                className="text-white hover:text-white/90 p-2 rounded-full"
                aria-label="Notifications"
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  ></path>
                  <path
                    d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
              <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                U
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
