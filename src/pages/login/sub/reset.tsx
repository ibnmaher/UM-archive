import { TextField, Button } from "@mui/material";
import { Message } from "common/components/message";
import { setAuth } from "common/context/slices/authSlice";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { loginSchema } from "utils/loginSchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { useReset } from "../api/useReset";

export const Reset = () => {
  const [values, setValues] = useState({ email: "" });
  const [open, setOpen] = useState(false);
  const { response, error, reset, loading } = useReset();
  const handleSubmit = async (
    e: React.SyntheticEvent,

    values: { email: string }
  ) => {
    e.preventDefault();
    reset(values);
  };
  useEffect(() => {
    response?.status && setOpen(true);
  }, [response, error]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action="submit"
        onSubmit={(e: React.SyntheticEvent) => handleSubmit(e, values)}
        className="w-1/2 lg:w-1/3 h-full flex flex-col gap-5 justify-center items-start"
      >
        <h1 className="text-2xl text-blue-500 ml-20 ">اعادة ضبط الرمز</h1>

        <TextField
          id="email"
          label="البريد الألكتروني"
          variant="outlined"
          className=" w-full"
          name="email"
          type="email"
          InputProps={{ sx: { backgroundColor: "white" } }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setValues((state: { email: string }) => {
              return {
                ...state,
                email: e.target.value,
              };
            });
          }}
        />

        <Button variant="contained" className="mx-auto" type="submit">
          تأكيد{" "}
        </Button>

        <div className="w-full flex items-center justify-between">
          <Link to="/login">تسجيل دخول</Link>
          <Link to="/signup">تسجيل للمرة الاولى؟</Link>
        </div>
      </form>
      <Message
        open={open}
        setOpen={setOpen}
        severity={error ? "error" : "info"}
        message={error ? error.data.message : "قم بالتحقق من بريدك الالكتروني"}
      />
    </div>
  );
};
