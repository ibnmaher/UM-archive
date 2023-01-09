import { TextField, Button } from "@mui/material";

import { Link } from "react-router-dom";
import React, { ChangeEvent, useState, useEffect } from "react";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { signupSchema } from "utils/signupSchema";

export const Signup = () => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValues((values) => {
      return { ...values, [name]: e.target.value };
    });
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
  });
  const handleSubmit = async (
    e: React.SyntheticEvent,

    values: { email: string; password: string }
  ) => {
    try {
      e.preventDefault();
      await validationFunction(signupSchema, values);
      console.log({ ...values });
    } catch (err: any) {
      yupErrorHandler(err.inner, setErrors);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => handleSubmit(e, values)}
        className="w-1/2 lg:w-1/3 h-full flex flex-col gap-5 justify-center items-start"
      >
        <h1 className="text-2xl text-blue-500 ml-20 ">
          تسجيل دخول للمرة الاولى
        </h1>
        <TextField
          id="email"
          label="البريد الألكتروني"
          variant="outlined"
          className="  w-full"
          error={errors.email.error}
          helperText={errors.email.message}
          InputProps={{ sx: { backgroundColor: "white" } }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e, "email");
          }}
        />
        <TextField
          id="password"
          label="الرمز السري"
          variant="outlined"
          type="password"
          className="  w-full"
          helperText={errors.password.message}
          error={errors.password.error}
          InputProps={{ sx: { backgroundColor: "white" } }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e, "password");
          }}
        />
        <TextField
          id="confirPassword"
          label=" تأكيد الرمز السري"
          variant="outlined"
          type="password"
          className="  w-full"
          error={errors.confirmPassword.error}
          helperText={errors.confirmPassword.message}
          InputProps={{ sx: { backgroundColor: "white" } }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e, "confirmPassword");
          }}
        />
        <Button variant="contained" className="mx-auto" type="submit">
          تسجيل دخول
        </Button>
        <Link to="/login">امتلك حساب!</Link>
      </form>
    </div>
  );
};
