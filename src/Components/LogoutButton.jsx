import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/authSlice";
import { log_out } from "../assets";
const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());

    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="flex cursor-pointer items-center border py-2 w-48 justify-center
          text-sm font-medium text-white outline-none transition-all duration-100
          ease-in-out hover:bg-[#F28E33] hover:text-gray-200 rounded-2xl"
    >
      <img src={log_out} alt="menu" className="pr-2" />
      Log out
    </button>
  );
};

export default LogoutButton;
