import React, { useState } from 'react';

export default function PersonDetails() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    skills: "React, JavaScript, HTML, CSS",
    birthDate: "1990-01-01",
    gender: "Male",
    country: "Jordan",
    city: "Amman",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl space-y-6 mx-auto">
        <h1 className="text-3xl font-bold text-[#1a1a3f] mb-6">Details</h1>

        <div className="space-y-6">
          {/* Skills Input */}
          <div>
            <label htmlFor="skills" className="block text-xl font-semibold text-gray-900 mb-2">
              Skills
            </label>
            <input
              type="text"
              id="skills"
              placeholder="Enter your skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a3f] focus:border-transparent"
            />
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-xl font-semibold text-gray-900 mb-2">
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a3f] focus:border-transparent"
              />
            </div>

            {/* Gender Dropdown */}
            <div>
              <label htmlFor="gender" className="block text-xl font-semibold text-gray-900 mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a3f] focus:border-transparent"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Country Dropdown */}
            <div>
              <label htmlFor="country" className="block text-xl font-semibold text-gray-900 mb-2">
                Country
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a3f] focus:border-transparent"
              >
                <option value="Jordan">Jordan</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-xl font-semibold text-gray-900 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1a3f] focus:border-transparent"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              
              className="px-6 py-2 bg-[#1a1a3f] text-white rounded-lg hover:bg-[#2a2a4f] focus:ring-2 focus:ring-[#1a1a3f] focus:ring-offset-2 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
