import React, { useState } from "react";
import HeaderProfile from "../Components/Profile/HeaderProfile";
import ChangePassword from "../Components/Profile/ChangePassword";
import PersonalInformation from "../Components/Profile/PersonalInformation";
import PersonDetails from "../Components/Profile/Details";

function Profile() {
  const [selectedSection, setSelectedSection] = useState("personalInfo");

  const SectionButton = ({ label, description, icon, section }) => (
    <button
      onClick={() => setSelectedSection(section)}
      className={`w-full flex items-center gap-3 p-3 text-left ${
        selectedSection === section ? "bg-gray-200" : "hover:bg-gray-200"
      } rounded-lg transition-colors`}
      aria-label={`Go to ${label}`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      <HeaderProfile />
      <div className="md:p-10 p-0">
        <div className="flex items-center gap-2 mb-5">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <svg
              fill="#000000"
              height="30px"
              width="30px"
              viewBox="0 0 512 512"
            >
              <polygon points="213.3,205.3 213.3,77.3 0,248 213.3,418.7 213.3,290.7 512,290.7 512,205.3" />
            </svg>
          </button>
          <h1 className="text-lg md:2xl font-bold text-gray-800">Profile Settings</h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-64 bg-gray-100 border-r border-gray-200">
            <nav className="p-4 space-y-2">
              <SectionButton
                label="Personal Information"
                description="Name, email, avatar, and more!"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#1C274C" strokeWidth="1.5"></circle>
                    <path d="M12 17V11" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
                    <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#1C274C"></circle>
                  </svg>
                }
                section="personalInfo"
              />
              <SectionButton
                label="Password"
                description="Change your current password"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                    />
                    <path opacity="0.5" d="M12 14V18" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path opacity="0.5" d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
                  </svg>
                }
                section="password"
              />
              <SectionButton
                label="Details"
                description="Skills, Gender"
                icon={
                  <svg fill="#000000" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z" />
                    <path d="M9,14H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z" />
                    <path d="M9,18H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z" />
                    <path d="M9,22H19a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z" />
                  </svg>
                }
                section="details"
              />
            </nav>
          </aside>

          <main className="flex-1 bg-gray-100">
            {selectedSection === "personalInfo" && <PersonalInformation />}
            {selectedSection === "password" && <ChangePassword />}
            {selectedSection === "details" && <PersonDetails />}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Profile;
