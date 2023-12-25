import { TextField, Button } from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import React, { ChangeEvent, useState, useEffect } from "react";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { signupSchema } from "utils/signupSchema";
import { boolean } from "yup";
import { Message } from "common/components/message";
import { useSignup } from "./api/useSignup";
import { useDispatch } from "react-redux";
import { setAuth } from "common/context/slices/authSlice";
import { BsFileEarmarkPdf } from "react-icons/bs";

export const Signup = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { response, signup, error, loading } = useSignup();
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
    code: {
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
      setErrors({
        email: {
          error: false,
          message: "",
        },
        code: {
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
      await validationFunction(signupSchema, values);
      await signup(values);
    } catch (err: any) {
      yupErrorHandler(err.inner, setErrors);
    }
  };
  useEffect(() => {
    if (location?.state?.redirect) {
      setOpen(true);
    }
  }, [location.state]);
  useEffect(() => {
    if (error?.status !== 500) {
      setOpen(true);
    }
  }, [error]);
  useEffect(() => {
    if (response?.status === 201) {
      localStorage.setItem("token", response.token);
      dispatch(setAuth(response));
    }
  }, [response]);
  return (
    <div className="w-full h-screen flex gap-20 items-center justify-center">
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
          id="code"
          label="رمز التحقق"
          variant="outlined"
          className="  w-full"
          error={errors.code.error}
          helperText={errors.code.message}
          InputProps={{ sx: { backgroundColor: "white" } }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e, "code");
          }}
        />
        <TextField
          id="password"
          label="كلمة المرور"
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
          label=" تأكيد كلمة المرور"
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
        <div className="flex justify-between w-full">
          <Link to="/login">امتلك حساب!</Link>
          <Link to="/resend-code">اعادة إرسال رمز التحقق</Link>
        </div>
      </form>
      <Message
        open={open}
        setOpen={setOpen}
        severity={error ? "error" : "info"}
        message={error ? error.data.message : "قم بانشاء رمز دخول"}
      />
      <a
        href={`${process.env.REACT_APP_URL}files/instructions.pdf`}
        target="_blank"
        className=" text-2xl flex gap-2"
      >
        ملف تعريفي للتسجيل والدخول الى النظام
        <BsFileEarmarkPdf className="text-3xl text-red-500" />
      </a>
    </div>
  );
};
