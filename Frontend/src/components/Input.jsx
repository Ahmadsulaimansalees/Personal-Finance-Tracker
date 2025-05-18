import React, { useState } from "react";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaUser,
  FaLock,
  FaRegIdBadge,
} from "react-icons/fa6";

function Input({ value, onChange, placeholder, label, type, id, ...props }) {
  const [showPassword, setshowPassword] = useState(false);
  const toggleShowPassword = () => setshowPassword((prev) => !prev);

  // Choose left icon based on type or id
  let leftIcon = null;
  if (type === "password") {
    leftIcon = <FaLock className="text-gray-400 mr-2" size={18} />;
  } else if (type === "email" || id?.toLowerCase().includes("email")) {
    leftIcon = <FaUser className="text-gray-400 mr-2" size={18} />;
  } else if (
    id?.toLowerCase().includes("full") ||
    id?.toLowerCase().includes("name")
  ) {
    leftIcon = <FaRegIdBadge className="text-gray-400 mr-2" size={18} />;
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-[13px] text-slate-800 mb-1 font-medium"
        >
          {label}
        </label>
      )}
      <div
        className={`
          flex items-center bg-white/80 border border-gray-300
          rounded-lg px-3 py-2 transition
          focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100
          shadow-sm
        `}
      >
        {leftIcon}
        <div className="relative w-full flex items-center">
          <input
            id={id}
            className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-300 text-[15px] pr-10"
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={type === "password" ? "current-password" : undefined}
            {...props}
          />

          {type === "password" && (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-0 top-1/2 -translate-y-1/2 focus:outline-none w-8 h-8 flex items-center justify-center"
              onClick={toggleShowPassword}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <FaRegEye size={20} className="text-sky-500" />
              ) : (
                <FaRegEyeSlash size={20} className="text-gray-400" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
