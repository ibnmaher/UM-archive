import { TextField, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 lg:w-1/3 h-full flex flex-col gap-5 justify-center items-start">
        <h1 className="text-2xl text-blue-500 ml-20 ">
          تسجيل دخول للمرة الاولى
        </h1>
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
        <TextField
          id="password"
          label=" تأكيد الرمز السري"
          variant="outlined"
          type="password"
          className=" bg-white w-full"
        />
        <Button variant="contained" className="mx-auto">
          تسجيل دخول
        </Button>
        <Link to="/login">امتلك حساب!</Link>
      </div>
    </div>
  );
};
