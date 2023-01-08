import { TextField, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 lg:w-1/3 h-full flex flex-col gap-5 justify-center items-start">
        <h1 className="text-2xl text-blue-500 ml-20 ">تسجيل دخول</h1>
        <TextField
          id="email"
          label="البريد الألكتروني"
          variant="outlined"
          className=" bg-white w-full"
        />
        <TextField
          id="password"
          label="الرمز السري"
          variant="outlined"
          type="password"
          className=" bg-white w-full"
        />
        <Button variant="contained" className="mx-auto">
          تسجيل دخول
        </Button>
        <div className="w-full flex items-center justify-between">
          <Link to="">هل نسيت الرمز؟</Link>
          <Link to="/signup">تسجيل للمرة الاولى؟</Link>
        </div>
      </div>
    </div>
  );
};
