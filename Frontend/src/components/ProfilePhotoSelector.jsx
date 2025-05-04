import React from "react";
import { useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import Input from "./Input";

function ProfilePhotoSelector({ image, setImage }) {
  const inputRef = useRef(null);
  const [previewURL, setpreviewURL] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // update the image state
      setImage(file);
    }
    const preview = URL.createObjectURL(file);
    setpreviewURL(preview);
  };
  // Remove/ Delete image
  const handleRemoveImage = () => {
    setImage(null);
    setpreviewURL(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6 ">
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-teal-100 rounded-full relative">
          <LuUser className="text-4xl text-teal-500" />
          <button
            type="button"
            className="w-8 h-8 items-center text-center justify-center bg-teal-500 text-white rounded-full absolute -bottom-1 -right-1
          "
            onClick={onChooseFile}
          >
            <LuUpload className="mx-auto" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewURL}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoSelector;
