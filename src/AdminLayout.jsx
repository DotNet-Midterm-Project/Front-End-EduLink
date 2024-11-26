import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { UserCircleIcon, LogoutIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { logout } from "./Redux/Slices/authSlice";

const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col fixed h-screen">

      <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-left hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <LogoutIcon className="w-6 h-6 mr-2" />
            Logout
          </button>
        </div>
        <div className="flex items-center justify-center h-20 border-b border-blue-500">

            
          <UserCircleIcon className="w-12 h-12 mr-2" />
          <div>
            <h1 className="font-bold text-lg">{userName}</h1>
            <p className="text-sm">{email}</p>
          </div>
        </div>

        <nav className="flex-1 mt-4 overflow-y-auto">
          <NavLink
            to="/admin/volunteers"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-blue-700 ${isActive ? "bg-blue-700" : ""}`
            }
          >
            Manage Volunteers
          </NavLink>
          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-blue-700 ${isActive ? "bg-blue-700" : ""}`
            }
          >
            Manage Courses
          </NavLink>
          <NavLink
            to="/admin/departments"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-blue-700 ${isActive ? "bg-blue-700" : ""}`
            }
          >
            Manage Departments
          </NavLink>
          <NavLink
            to="/admin/articles"
            className={({ isActive }) =>
              `block px-4 py-2 hover:bg-blue-700 ${isActive ? "bg-blue-700" : ""}`
            }
          >
            Manage Articles
          </NavLink>
        </nav>

      
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
