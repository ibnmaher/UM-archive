import React from "react";
import { HiLogin } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  let activeLinkStyle = {
    color: "white",
    // backgroundColor: "#F8F4EA",
    borderRadius: "99px",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "10px",
    paddingRight: "10px",
    aliginText: "center",
  };
  return (
    <div className="absolute top-0 w-full h-20 bg-primary rounded-b-md flex items-center justify-between p-6">
      <ul className="flex items-center justify-center gap-3 text-secondary font-semibold">
        <NavLink
          to="login"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          className="hover:text-white"
        >
          تسجيل دخول
        </NavLink>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          className="hover:text-white"
        >
          الصفحة الرئيسية
        </NavLink>
      </ul>
    </div>
  );
};
