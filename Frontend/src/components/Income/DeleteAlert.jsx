import React from "react";

function DeleteAlert({ content, onDelete }) {
  return (
    <div className=" p-4">
      <p className="text-sm dark:text-white">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill"
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteAlert;
