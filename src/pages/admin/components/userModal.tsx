import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { Message } from "common/components/message";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AUTH } from "types";
import { addUserSchema } from "utils/addUserSchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { useAddUser } from "../api/addUser";
import FocusLock from "react-focus-lock";

export const UserModal = ({
  setUserModal,
  auth,
}: {
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  auth: AUTH;
}) => {
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs());
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs());
  const [values, setValues] = useState<any>({ supervisor: false });
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { response, addUser, loading, error } = useAddUser(
    {},
    { Authorization: `Bearer ${auth.token}` }
  );
  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
    phone: {
      error: false,
      message: "",
    },
    department: {
      error: false,
      message: "",
    },
  });

  const handleChange = (e: any, name: string) => {
    setValues((values: any) => {
      return { ...values, [name]: e.target.value };
    });
  };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors({
      email: {
        error: false,
        message: "",
      },
      name: {
        error: false,
        message: "",
      },
      phone: {
        error: false,
        message: "",
      },
      department: {
        error: false,
        message: "",
      },
    });
    try {
      await validationFunction(addUserSchema, values);
      await addUser(values);
    } catch (err: any) {
      console.log(err);
      yupErrorHandler(err.inner, setErrors);
    }
  };
  useEffect(() => {
    if (error?.status === 409) {
      setErrors((state: any) => {
        return {
          ...state,
          email: { error: true, message: error.data.message },
        };
      });
    } else if (error?.status) {
      setOpen(true);
    }
  }, [error]);
  useEffect(() => {
    if (response?.status === 201) {
      setOpen(true);
      setValues({ supervisor: false });
      formRef?.current?.reset();
    }
  }, [response]);
  return (
    <FocusLock>
      <div className="fixed w-full h-full bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0  z-50 flex items-center justify-center cursor-pointer ">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className=" h-4/5 w-4/5 bg-quan rounded-lg cursor-default flex items-center justify-center relative"
        >
          <FormControl
            fullWidth
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              gap: "16px",
            }}
          >
            <TextField
              size="small"
              id="department"
              label="القسم "
              InputProps={{ sx: { backgroundColor: "white" } }}
              select
              error={errors.department.error}
              helperText={errors.department.message}
              onChange={(e) => handleChange(e, "department")}
            >
              <MenuItem value={"علوم حاسبات"}>علوم حاسبات</MenuItem>
              <MenuItem value={"هندسة"}>هندسة</MenuItem>
              <MenuItem value={"تربية"}>تربية</MenuItem>
            </TextField>
            <TextField
              label="الاسم"
              id="name"
              size="small"
              error={errors.name.error}
              helperText={errors.name.message}
              InputProps={{ sx: { backgroundColor: "white" } }}
              onChange={(e) => handleChange(e, "name")}
            />

            <TextField
              label="البريد الالكتروني"
              id="email"
              InputProps={{ sx: { backgroundColor: "white" } }}
              size="small"
              onChange={(e) => handleChange(e, "email")}
              error={errors.email.error}
              helperText={errors.email.message}
            />
            <TextField
              label="رقم الهاتف "
              id="phone"
              InputProps={{ sx: { backgroundColor: "white" } }}
              size="small"
              onChange={(e) => handleChange(e, "phone")}
              error={errors.phone.error}
              helperText={errors.phone.message}
            />

            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={values.supervisor}
                  onChange={() =>
                    setValues((values: any) => {
                      return { ...values, supervisor: !values.supervisor };
                    })
                  }
                />
              }
              label="مشرف"
            />

            <Button
              variant="contained"
              sx={{ width: "16rem", marginX: "auto", fontSize: "16px" }}
              type="submit"
            >
              اضافة
            </Button>
          </FormControl>
          <Button
            color="error"
            sx={{
              position: "absolute",
              backgroundColor: "white",
              boxShadow: 1,
            }}
            className="top-4 right-4"
            onClick={() => setUserModal(false)}
          >
            <AiOutlineClose />
          </Button>
        </form>
        <Message
          open={open}
          setOpen={setOpen}
          severity={error ? "error" : "success"}
          message={error ? "حدث خطاء" : "تمت اضافة مستخدم"}
        ></Message>
      </div>
    </FocusLock>
  );
};
