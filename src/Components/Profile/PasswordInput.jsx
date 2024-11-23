import React, { useState } from "react";

function PasswordInput({ label, placeholder, name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
          placeholder={placeholder}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 5C6.55576 5 3.53109 9.23425 2.45554 11.1164C2.23488 11.5025 2.12456 11.6956 2.1367 11.9836C2.14885 12.2716 2.27857 12.4598 2.53799 12.8362C3.8182 14.6935 7.29389 19 12 19C16.7061 19 20.1818 14.6935 21.462 12.8362C21.7214 12.4598 21.8511 12.2716 21.8633 11.9836C21.8754 11.6956 21.7651 11.5025 21.5445 11.1164C20.4689 9.23425 17.4442 5 12 5Z"
      stroke="#222222"
    ></path>
    <circle cx="12" cy="12" r="3" stroke="#222222"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.707 20.707a1 1 0 0 0 0-1.414l-16-16a1 1 0 0 0-1.414 1.414L5.205 6.62C2.785 8.338 1.5 10.683 1.5 12c0 2.25 3.75 7.5 10.5 7.5 1.916 0 3.59-.423 5.006-1.08l2.287 2.287a1 1 0 0 0 1.414 0zm-6.13-4.716-1.51-1.51a2.7 2.7 0 0 1-3.548-3.548l-1.51-1.51a4.75 4.75 0 0 0 6.568 6.568zM22.5 12c0 1.005-.749 2.61-2.18 4.078l-3.594-3.595a4.75 4.75 0 0 0-5.209-5.209L9.088 4.846C9.985 4.626 10.957 4.5 12 4.5c6.75 0 10.5 5.25 10.5 7.5z"
      fill="#000000"
    ></path>
  </svg>
);

export default PasswordInput;
