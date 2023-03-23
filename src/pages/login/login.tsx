import { TextField, Button } from "@mui/material";
import { setAuth } from "common/context/slices/authSlice";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { loginSchema } from "utils/loginSchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { useLogin } from "./api/useLogin";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const { response, loading, error, login } = useLogin();
  const handleSubmit = async (
    e: React.SyntheticEvent,

    values: { email: string; password: string }
  ) => {
    try {
      e.preventDefault();
      setErrors({
        email: {
          error: false,
          message: "",
        },
        password: {
          error: false,
          message: "",
        },
      });
      await validationFunction(loginSchema, values);
      await login(values);
    } catch (err: any) {
      yupErrorHandler(err.inner, setErrors);
    }
  };
  useEffect(() => {
    if (error?.status === 307) {
      navigate("/signup", { state: { redirect: true } });
    } else if (error?.status === 404) {
      setErrors((state: any) => {
        return {
          ...state,
          email: { error: true, message: error.data.message },
        };
      });
    } else if (error?.status === 401) {
      setErrors((state: any) => {
        return {
          ...state,
          password: { error: true, message: error.data.message },
        };
      });
    } else {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    if (response?.status === 200) {
      localStorage.setItem("token", response.token);
      dispatch(setAuth(response));
    }
  }, [response]);
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
        {!loading ? (
          <Button variant="contained" className="mx-auto" type="submit">
            تسجيل دخول
          </Button>
        ) : (
          <MoonLoader color="blue" size={30} className="mx-auto" />
        )}

        <div className="w-full flex items-center justify-between">
          <Link to="/reset">هل نسيت الرمز؟</Link>
          <Link to="/signup">تسجيل للمرة الاولى؟</Link>
        </div>
      </form>
    </div>
  );
};
