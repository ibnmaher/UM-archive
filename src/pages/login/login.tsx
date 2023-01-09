import { TextField, Button } from "@mui/material";
import React, { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "utils/loginSchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";

export const Login = () => {
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
  });
  const handleSubmit = async (
    e: React.SyntheticEvent,

    values: { email: string; password: string }
  ) => {
    try {
      e.preventDefault();
      await validationFunction(loginSchema, values);
      console.log({ ...values });
    } catch (err: any) {
      yupErrorHandler(err.inner, setErrors);
    }
  };
  console.log(errors);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action="submit"
        onSubmit={(e: React.SyntheticEvent) => handleSubmit(e, values)}
        className="w-1/2 lg:w-1/3 h-full flex flex-col gap-5 justify-center items-start"
      >
        <h1 className="text-2xl text-blue-500 ml-20 ">تسجيل دخول</h1>

        <TextField
          id="email"
          label="البريد الألكتروني"
          variant="outlined"
          className=" w-full"
          name="email"
          type="email"
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
          className=" w-full"
          name="password"
          error={errors.password.error}
          helperText={errors.password.message}
          InputProps={{ sx: { backgroundColor: "white" } }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e, "password");
          }}
        />
        <Button variant="contained" className="mx-auto" type="submit">
          تسجيل دخول
        </Button>

        <div className="w-full flex items-center justify-between">
          <Link to="">هل نسيت الرمز؟</Link>
          <Link to="/signup">تسجيل للمرة الاولى؟</Link>
        </div>
      </form>
    </div>
  );
};
