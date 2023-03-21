import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { resetPasswordSchema } from "utils/resetPasswordSchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { useResetPassword } from "../api/useResetPassword";

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
  return (
    <form
      onSubmit={(e) => handleSubmit(e, values)}
      className="w-full h-screen flex flex-col items-center justify-center gap-4"
    >
      <TextField
        id="password"
        label="الرمز السري"
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
        label=" تأكيد الرمز السري"
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
      <Button variant="contained" className="mx-auto" type="submit">
        تأكيد
      </Button>
    </form>
  );
};
