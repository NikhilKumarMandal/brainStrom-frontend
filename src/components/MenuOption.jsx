import React from "react";

export default function MenuOption({ title, action, selected = false }) {
  return (
    <div
      onClick={action}
      className={`text-lg font-medium cursor-pointer px-5 py-2 w-[80%] rounded-r-3xl transition
        ${
          selected
            ? "bg-amber-600 text-black"
            : "text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-105"
        }`}
    >
      {title}
    </div>
  );
}
