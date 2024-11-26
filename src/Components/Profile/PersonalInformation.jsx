import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import axios from "axios";
import yourProfile from "../../assets/icons/yourProfile.svg";
import Swal from 'sweetalert2'
 
export default function PersonalInformation() {
  const [loading, setLoading] = useState(false);
  const Url = import.meta.env.VITE_URL_BACKEND;
  const token = localStorage.getItem("token");
 
  const [formData, setFormData] = useState({
    Name: localStorage.getItem("userName"),
    PhoneNumber: "",
    Email: "",
    DepartmentID: "",
    AvatarPreview: localStorage.getItem("avatarPreview"),
    AvatarPreviewUrl: null, // For real-time preview
  });
 
  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
 
    const fetchData = async () => {
      try {
        setFormData({
          Email: localStorage.getItem("email") || "",
          DepartmentID: localStorage.getItem("department") || 0,
          AvatarPreview: localStorage.getItem("avatarPreview"),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, [token]);
 
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData({
        ...formData,
        AvatarPreview: file,
        AvatarPreviewUrl: previewURL,
      });
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    const form = new FormData();
    form.append("Name", formData.Name);
    form.append("PhoneNumber", formData.PhoneNumber);
    form.append("Email", formData.Email);
    form.append("DepartmentID", formData.DepartmentID);
 
    if (formData.AvatarPreview && formData.AvatarPreview instanceof File) {
      form.append("AvatarPreview", formData.AvatarPreview);
    }
 
    try {
      const response = await axios.put(`${Url}/api/Common/Edit-Profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form submitted successfully", response.data);
      localStorage.setItem("avatarPreview", response.data.imageProfile); // Update local storage
      localStorage.setItem("userName", response.data.name); // Update local storage
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your profile has been updated successfully",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  `Error submitting form: ${error.message}`,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    } finally {
      setLoading(false);
    }
  };
 
  const avatarImage =
    formData.AvatarPreviewUrl && formData.AvatarPreviewUrl !== "null"
      ? formData.AvatarPreviewUrl
      : formData.AvatarPreview && formData.AvatarPreview !== "null"
      ? `${Url}/Resources/${formData.AvatarPreview}`
      : yourProfile;
  console.log("Avatar Image:", avatarImage);
  return (
    <main className="h-[550px] bg-gray-100">
      {loading && <Loading />}
 
      <div className="max-w-4xl space-y-6 mx-auto mt-3">
        <h2 className="text-xl md:text-3xl font-bold text-[#1a1a3f]">
          Personal Information
        </h2>
 
        <div>
          <h3 className="text-xl font-medium mb-4" style={{ color: "#0B102F" }}>
            Avatar
          </h3>
 
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-medium text-gray-700">Preview</h4>
              <div className="w-16 h-16">
                <img
                  src={avatarImage}
                  alt="Avatar preview"
                  className="w-full h-full object-cover rounded-full border"
                />
              </div>
             
            </div>
 
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Image</span>
 
              <label className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
                Upload new image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
        </div>
 
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                User Name
              </label>
              <input
                type="text"
                id="Name"
                value={formData.Name}
                onChange={handleInputChange}
                placeholder="User Name"
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
 
            <div>
              <label
                htmlFor="PhoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
 
            <div>
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="Email"
                value={formData.Email}
                onChange={handleInputChange}
                disabled
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
 
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#1a1a3f] text-white rounded-lg hover:bg-[#2a2a4f] focus:ring-2 focus:ring-[#1a1a3f] focus:ring-offset-2 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}