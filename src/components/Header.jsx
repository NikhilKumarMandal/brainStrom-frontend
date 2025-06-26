import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/api";
import { useAuthStore } from "../store/store";
import logo from "../assets/logo.png";
import getRandomImage from "../utils/getRandomImage";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout: logoutUserFromStore } = useAuthStore();

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutUserFromStore();
    },
  });

  const handleLogout = () => {
    logoutMutate();
    setMenuOpen(false);
  };

  return (
    <div className="w-[90%] text-white py-4  flex justify-between items-center self-center relative">
      <img src={logo} alt="Logo" className="w-24 h-16" />

      <h1 className="text-2xl text-gray-300 font-bold text-center">
        Ask Questions, Get Answers
      </h1>

      {/* Profile Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="focus:outline-none bg-transparent border-none"
      >
        <img
          src={getRandomImage()}
          alt="Profile"
          className="w-12 h-12 rounded-lg object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-gray-700 rounded-lg z-10">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 border-none"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
