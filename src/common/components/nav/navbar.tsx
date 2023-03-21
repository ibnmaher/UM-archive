import React from "react";
import { HiLogin } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAuth } from "common/context/slices/authSlice";
import { AUTH } from "types";
export const Navbar = ({ auth }: { auth: AUTH }) => {
  console.log(auth);
  const dispatch = useDispatch();
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
    <div className="absolute top-0 w-full h-20 bg-primary rounded-b-md flex items-center justify-between z-50 p-6">
      <ul className="flex items-center justify-center gap-3 text-secondary font-semibold">
        {!auth && (
          <NavLink
            to="login"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="hover:text-white"
          >
            تسجيل دخول
          </NavLink>
        )}
        {auth && (
          <button
            onClick={() => {
              localStorage.clear();
              dispatch(setAuth(false));
            }}
          >
            تسجيل خروج
          </button>
        )}
        {auth && (
          <NavLink
            to="admin"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="hover:text-white"
          >
            الصفحة الشخصية
          </NavLink>
        )}
        {!auth && (
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            className="hover:text-white"
          >
            الصفحة الرئيسية
          </NavLink>
        )}
      </ul>
      <h1 className="text-white text-xl">{auth?.name}</h1>
    </div>
  );
};
