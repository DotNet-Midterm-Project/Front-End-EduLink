import { Link } from "react-router-dom";
import {
  booking,
  profileSttings,
  register,
  viewArticles,
  events,
  courses,
  yourProfile,
  close,
} from "../../assets";
import LogoutButton from "../LogoutButton";
import RegisterModal from "./RegisterModal";
import { useState } from "react";

function SideBar({ onClose }) {
  const user = localStorage.getItem("userName") || "";
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);


  return (
    <>
      <div className="fixed top-0 right-0 h-screen w-64 bg-[#0D47A1]">
        <div className="h-screen w-64 pb-10">
          <div className="flex h-screen flex-grow flex-col rounded-br-lg rounded-tr-lg bg-[#0D47A1] shadow-md">
            <div className="flex mt-4 items-center px-4">
              <img src={yourProfile} className="h-10 w-10" />
              <div className="flex ml-3 flex-col">
                <h3 className="font-medium text-white">{user}</h3>
              </div>
              <div className="ml-14">
                <button onClick={onClose}>
                  <img src={close} className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative inline-block mx-4">
              <hr className="h-px mt-4 bg-white border-0 dark:bg-white" />
            </div>
            <div className="flex mt-3 flex-1 flex-col">
              <div className="">
                <nav className="flex-1">
                  <Link
                    to="#"
                    title=""
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img
                      src={yourProfile}
                      className="mr-4 h-5 w-5 align-middle"
                    />
                    Your Profile
                  </Link>

                  <Link
                    to="/student-page"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={courses} className="mr-4 h-5 w-5 align-middle" />
                    Your Courses
                  </Link>
                  <Link
                    to="#"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={events} className="mr-4 h-5 w-5 align-middle" />
                    Your Events
                  </Link>

                  <Link
                    to="/event-page"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={booking} className="mr-4 h-5 w-5 align-middle" />
                    Book an Event
                  </Link>
                  <Link
                    to="/articles"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img
                      src={viewArticles}
                      className="mr-4 h-5 w-5 align-middle"
                    />
                    View Articles
                  </Link>
                  <div className="relative w-[280px] inline-block mx-4">
                    <hr className="h-px bg-white border-0 dark:bg-white" />
                  </div>

                  <button
                    onClick={handleOpenModal}
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <img src={register} className="mr-4 h-5 w-5 align-middle" />
                    Register as a Volunteer
                  </button>

                  <div className="relative w-[280px] inline-block mx-4">
                    <hr className="h-px bg-white border-0 dark:bg-white" />
                  </div>

                  <Link
                    to="#"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
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
            <div className="relative w-[280px] inline-block mx-4 mb-6">
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
