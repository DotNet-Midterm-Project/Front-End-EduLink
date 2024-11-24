import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import Loading from "../Loading";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  
  const Url = import.meta.env.VITE_URL_BACKEND;
  // console.log("URL:", Url);
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${Url}/api/Account/Change-Password`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Password Changed Successfully',
        text: 'Your password has been updated.',
        confirmButtonText: 'OK',
      });
    } catch (error) {


      
     

      // Display error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data || 'Something went wrong. Please try again.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
     
      {loading && <Loading />}
      <div className="max-w-4xl mx-auto rounded-lg shadow-sm">
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl md:text-3xl font-bold text-[#1a1a3f]">
            Change Password
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <PasswordInput
              label="Current Password"
              placeholder="Enter your current password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleInputChange}
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter your new password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleInputChange}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your new password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#1a1a3f] mt-3 text-white rounded-lg hover:bg-[#2a2a4f] focus:ring-2 focus:ring-[#1a1a3f] focus:ring-offset-2 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
