import React from "react";

interface DeleteUserButtonProps {
  onDelete: () => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ onDelete }) => {
  return (
    <button
      onClick={onDelete}
      className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Delete
    </button>
  );
};

export default DeleteUserButton;
