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
import { useState } from "react";


function SideBar({ onClose }) {
  const user = localStorage.getItem("userName") || "";
  const roles = JSON.parse(localStorage.getItem("roles") || "[]"); // جلب الأدوار من localStorage
  const isVolunteer = roles.includes("Volunteer"); // التحقق إذا كان المستخدم متطوعًا
  const [openModal, setOpenModal] = useState(false);
  const Url = import.meta.env.VITE_URL_BACKEND;


  const handleOpenModal = () => setOpenModal(true);
  const avatarImage = localStorage.getItem("avatarPreview") !== "null"
  ?`${Url}/Resources/${localStorage.getItem("avatarPreview")}` 
  : yourProfile;
  return (
    <>
      <div className="fixed top-0 right-0 h-screen w-96 bg-[#0D47A1]">
        <div className="h-screen w-96 pb-10">
          <div className="flex h-screen flex-grow flex-col rounded-br-lg rounded-tr-lg bg-[#0D47A1] shadow-md">
            <div className="flex mt-4 items-center px-4">
              <img src={avatarImage} className="h-10 w-10" />
              <div className="flex ml-3 flex-col">
                <h3 className="font-medium text-white">{user}</h3>
              </div>
              <div className="ml-44">
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
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={booking} className="mr-4 h-5 w-5 align-middle" />
                    Book an Event
                  </Link>
                  <Link
                    to="/your-event-page"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={events} className="mr-4 h-5 w-5 align-middle" />
                    Your Events
                  </Link>
                  <Link
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
                        to="/my-events"
                        className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                      >
                        <img src={events} className="mr-4 h-5 w-5 align-middle" />
                        My Events
                      </Link>
                      <Link
                        to="/booking-page"
                        className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-base font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                      >
                        <img src={booking} className="mr-4 h-5 w-5 align-middle" />
                        Bookings
                      </Link>
                    </>
                  )}


                  {!isVolunteer && (
                    <>
                                      <div className="relative w-[350px] inline-block mx-4">
                                      <hr className="h-px bg-white border-0 dark:bg-white" />
                                    </div>
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
                  </>
                  )}
                  <div className="relative w-[350px] inline-block mx-4">
                    <hr className="h-px bg-white border-0 dark:bg-white" />
                  </div>

                  <Link
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
            <div className="flex justify-center items-center w-full mb-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      {openModal && <RegisterModal onClose={() => setOpenModal(false)} />}
    </>
  );
}

export default SideBar;
