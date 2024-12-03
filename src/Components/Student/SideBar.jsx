import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  booking,
  profileSttings,
  register,
  viewArticles,
  events,
  yourProfile,
  close,
} from "../../assets";
import LogoutButton from "../LogoutButton";
import RegisterModal from "./RegisterModal";

function SideBar({ onClose }) {
  const user = localStorage.getItem("userName") || "";
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isVolunteer = roles.includes("Volunteer");
  const [openModal, setOpenModal] = useState(false);
  const sidebarRef = useRef(null);

  const Url = import.meta.env.VITE_URL_BACKEND;

  const handleOpenModal = () => setOpenModal(true);
  const avatarImage =
    localStorage.getItem("avatarPreview") !== "null"
      ? `${Url}/Resources/${localStorage.getItem("avatarPreview")}`
      : `${yourProfile}`;
  return (
    <>
      <div
        className="fixed top-0 right-0 h-screen w-96 pl-4 bg-[#0D47A1]"
        ref={sidebarRef}
      >
        <div className="h-screen w-96 pb-10">
          <div className="flex h-screen flex-grow flex-col rounded-br-lg rounded-tr-lg bg-[#0D47A1] shadow-md">
            <div className="flex mt-4 items-center justify-between px-4">
              <div className="flex items-center">
                <img src={avatarImage} className="h-10 w-10 rounded-full" />
                <div className="flex ml-3 flex-col">
                  <h3 className="font-medium text-white">{user}</h3>
                </div>
              </div>
              <div className="ml-8">
                <button onClick={onClose} className="p-4">
                  <img src={close} className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative inline-block mx-4">
              <hr className="h-px mt-4 bg-white border-0 dark:bg-white" />
            </div>
            <div className="flex mt-3 flex-1 flex-col">
              <div>
                <nav className="flex-1">
                  {/* الروابط العامة */}
                  <Link
                    to="/student-page"
                    onClick={onClose} // سيتم إغلاق السايد بار عند الضغط
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img
                      src={yourProfile}
                      className="mr-4 h-5 w-5 align-middle"
                    />
                    Your Profile
                  </Link>
                  <Link
                    to="/event-page"
                    onClick={onClose} // سيتم إغلاق السايد بار عند الضغط
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={booking} className="mr-4 h-5 w-5 align-middle" />
                    Book an Event
                  </Link>
                  <Link
                    to="/my-event"
                    onClick={onClose}
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={events} className="mr-4 h-5 w-5 align-middle" />
                    My Events
                  </Link>

                  <Link
                    onClick={onClose}
                    to="/volunteers"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img
                      src={yourProfile}
                      className="mr-4 h-5 w-5 align-middle"
                    />
                    View Volunteers
                  </Link>
                  <Link
                    onClick={onClose}
                    to="/articles"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img
                      src={viewArticles}
                      className="mr-4 h-5 w-5 align-middle"
                    />
                    View Articles
                  </Link>

                  {/* قسم خاص بالمتطوع */}
                  {isVolunteer && (
                    <>
                      <div className="relative w-[350px] inline-block mx-4">
                        <hr className="h-px mt-4 bg-white border-0 dark:bg-white" />
                      </div>
                      <h4 className="text-sm px-4 text-gray-300 uppercase">
                        Volunteer Section
                      </h4>
                      <Link
                        onClick={onClose}
                        to="/add-event"
                        className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                      >
                        <img
                          src={events}
                          className="mr-4 h-5 w-5 align-middle"
                        />
                        Add Event
                      </Link>
                      <Link
                        onClick={onClose}
                        to="/add-article"
                        className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                      >
                        <img
                          src={viewArticles}
                          className="mr-4 h-5 w-5 align-middle"
                        />
                        Add Article
                      </Link>
                      <Link
                        onClick={onClose}
                        to="/mange-events"
                        className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                      >
                        <img
                          src={events}
                          className="mr-4 h-5 w-5 align-middle"
                        />
                        Mange Events
                      </Link>
                      <Link
                        onClick={onClose}
                        to="/mange-booking"
                        className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                      >
                        <img
                          src={booking}
                          className="mr-4 h-5 w-5 align-middle"
                        />
                        Mange Bookings
                      </Link>
                    </>
                  )}

                  {!isVolunteer && (
                    <>
                      <div className="relative w-[350px] inline-block mx-4">
                        <hr className="h-px bg-white border-0 dark:bg-white" />
                      </div>
                      <div>
                      <button
                        onClick={handleOpenModal}  
                        className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                      >
                        <img
                          src={register}
                          className="mr-4 h-5 w-5 align-middle"
                        />
                        Register as a Volunteer
                      </button>
                      </div>
                    </>
                  )}
                  <div className="relative w-[350px] inline-block mx-4">
                    <hr className="h-px bg-white border-0 dark:bg-white" />
                  </div>

                  <Link
                    onClick={onClose}
                    to="/profile"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img
                      src={profileSttings}
                      className="mr-4 h-5 w-5 align-middle"
                    />
                    Profile Settings
                  </Link>
                </nav>
              </div>
            </div>
            <div className="relative w-[350px] inline-block mx-4 mb-6">
              <hr className="h-px bg-white border-0 dark:bg-white" />
            </div>
            <div className="flex justify-center items-center w-full mb-12">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      {openModal && <RegisterModal  onClose={() => setOpenModal(false)}/>}
    </>
  );
}

export default SideBar;
