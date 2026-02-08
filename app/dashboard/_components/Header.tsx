import { UserButton } from "@clerk/nextjs";
import { Menu, X, Search } from "lucide-react";
import React, { useState } from "react";
import SideNav from "./SideNav";

function Header() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between items-center">
      <div className="flex gap-2 items-center p-1 max-w-lg"></div>

      {/* Hamburger Menu for Mobile View */}
      <div className="md:hidden">
        <button
          className="text-gray-700 p-2 rounded-md "
          onClick={toggleSideNav}
        >
          {isSideNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Side Navigation with Smooth Transition */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideNav />
        <button
          className="absolute top-4 right-4 text-gray-700"
          onClick={toggleSideNav}
        >
          <X size={24} />
        </button>
      </div>

      {/* Membership Banner and User Button */}
      <div className="flex gap-5 items-center ">
        <h2 className="bg-violet-800 p-2 rounded-full text-md text-white px-2 ">
          🔥Join Membership just for $5/Month
        </h2>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
