import { Button, TextField } from "@mui/material";
import { Message } from "common/components/message";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { resetPasswordSchema } from "utils/resetPasswordSchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { useResetPassword } from "../api/useResetPassword";
import { MoonLoader } from "react-spinners";

export const ResetPassword = () => {
  const params = useParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setValues((values) => {
      return { ...values, [name]: e.target.value };
    });
  };
  const { response, resetPassword, loading, error } = useResetPassword({
    token: params?.token,
  });
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
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

    values: { password: string; confirmPassword: string }
  ) => {
    try {
      e.preventDefault();
      setErrors({
        password: {
          error: false,
          message: "",
        },
        confirmPassword: {
          error: false,
          message: "",
        },
      });
      await validationFunction(resetPasswordSchema, values);
      await resetPassword(values);
    } catch (err: any) {
      yupErrorHandler(err.inner, setErrors);
    }
  };
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (response?.status) {
      setOpen(true);
      navigate("/login");
    }

    error && setOpen(true);
  }, [response, error]);
  return (
    <form
      onSubmit={(e) => handleSubmit(e, values)}
      className="w-full h-screen flex flex-col items-center justify-center gap-4"
    >
      <TextField
        id="password"
        label="كلمة المرور"
        variant="outlined"
        type="password"
        className="  w-1/2"
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
        className="  w-1/2"
        error={errors.confirmPassword.error}
        helperText={errors.confirmPassword.message}
        InputProps={{ sx: { backgroundColor: "white" } }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleChange(e, "confirmPassword");
        }}
      />
      {!loading && (
        <Button
          variant="contained"
          className="mx-auto"
          disabled={loading}
          type="submit"
        >
          تأكيد{" "}
        </Button>
      )}
      {loading && <MoonLoader size={30} color="blue" />}
      <Message
        open={open}
        setOpen={setOpen}
        severity={error ? "error" : "info"}
        message={error ? error.data.message : "قم بالتحقق من بريدك الالكتروني"}
      />
    </form>
  );
};
