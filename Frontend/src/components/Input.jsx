import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, onChange, placeholder, label, type }) {
  const [showPassword, setshowPassword] = useState(false);
  const toggleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  return (
    <div className="">
      <label className="text-[13px] text-slate-800 dark:text-white">
        {label}
      </label>

      <div className="input-box">
        <input
          className="w-full bg-transparent outline-none"
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-teal-600 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
