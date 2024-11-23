import React, { useState } from "react";

export default function PersonDetails() {
  const [formData, setFormData] = useState({
    skills: "React, JavaScript, HTML, CSS",
    gender: "Male",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
<main className="h-[550px] bg-gray-100">
<div className="max-w-4xl space-y-6 mx-auto">
        <h1 className="text-3xl font-bold text-[#1a1a3f] mb-6">Details</h1>

        <div className="space-y-6">
          {/* Skills Input */}
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Enter your skills"
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Gender Display */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <div
              id="gender"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
            >
              {formData.gender}
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
