import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import axios from "axios";

export default function PersonalInformation() {
  const [loading, setLoading] = useState(false);
  const Url = import.meta.env.VITE_URL_BACKEND;

  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    email: "",
    department: "",
    avatarPreview: "",
  });

  useEffect(() => {
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    const fetchData = async () => {
      try {
        setFormData({
          userName: localStorage.getItem("userName") || '',
          phone: localStorage.getItem("phone") || '',
          email: localStorage.getItem("email") || '',
          department: localStorage.getItem("department") || '',
          avatarPreview: localStorage.getItem("avatarPreview") || '',
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatarPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${Url}/api/Common/Edit-Profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       
      console.log("Form submitted with data:", formData);
      console.log("Response:", response.data);

      // If the response indicates success, update the state
      
      // Optionally, you can reset the formData or redirect
      // setFormData(new FormData());
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
<main className="h-[550px] bg-gray-100">
{loading && <Loading />}

      <div className="max-w-4xl space-y-6 mx-auto mt-3">
        <h2 className="text-xl md:text-3xl font-bold text-[#1a1a3f]">
          Personal Information
        </h2>

        <div>
  {/* العنوان */}
  <h3 className="text-xl font-medium mb-4" style={{ color: "#0B102F" }}>
  Avatar
</h3>


  {/* المحتوى الأفقي */}
  <div className="flex items-center gap-6">
    {/* Preview */}
    <div className="flex items-center gap-4">
      <h4 className="text-sm font-medium text-gray-700">Preview</h4>
      <div className="w-16 h-16">
        <img
          src={formData.avatarPreview}
          alt="Avatar preview"
          className="w-full h-full object-cover rounded-full border"
        />
      </div>
    </div>

    {/* الصورة والكلمة وزر رفع الصورة */}
    <div className="flex items-center gap-4">
      {/* Image */}
      <span className="text-sm font-medium text-gray-700">Image</span>

      {/* زر رفع الصورة */}
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
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                User Name
              </label>
              <input
                type="text"
                id="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="User Name"
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ maxWidth: "400px" }}
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                value={formData.department}
                onChange={handleInputChange}
                disabled
                placeholder="Department"
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
