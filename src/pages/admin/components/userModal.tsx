import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
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
import { MoonLoader } from "react-spinners";

export const UserModal = ({
  setUserModal,
  auth,
  setRefetch,
}: {
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  auth: AUTH;
}) => {
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs());
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs());
  const [values, setValues] = useState<any>({ type: "user" });
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
      setValues((state: any) => {
        return { type: "user", department: state.department };
      });
      formRef?.current?.reset();
      setRefetch((state: boolean) => !state);
    }
  }, [response]);
  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setUserModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

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
              label="القسم"
              value={values.department}
              InputProps={{ sx: { backgroundColor: "white" } }}
              select
              error={errors.department.error}
              helperText={errors.department.message}
              onChange={(e) => handleChange(e, "department")}
            >
              <MenuItem value={"عام"}>عام</MenuItem>
              <MenuItem value={"علوم الحاسوب"}>علوم الحاسوب</MenuItem>
              <MenuItem value={"الأمن السيبراني"}>الأمن السيبراني</MenuItem>
              <MenuItem value={"الشبكات"}>الشبكات</MenuItem>
              <MenuItem value={"البرمجيات"}>البرمجيات</MenuItem>
              <MenuItem value={"الرياضيات"}>الرياضيات</MenuItem>
              <MenuItem value={"الإحصاء والمعلوماتية"}>
                الإحصاء والمعلوماتية
              </MenuItem>
              <MenuItem value={"بحوث العمليات والتقنيات الذكائية"}>
                بحوث العمليات والتقنيات الذكائية
              </MenuItem>
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

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={values.type}
              name="radio-buttons-group"
              row
              onChange={(e: any) =>
                setValues((state: any) => {
                  return { ...state, type: e.target.value };
                })
              }
            >
              <FormControlLabel
                defaultChecked
                value="user"
                control={<Radio />}
                label="مستخدم"
              />
              <FormControlLabel
                value="supervisor"
                control={<Radio />}
                label="مشرف"
              />
              <FormControlLabel
                value="deen"
                control={
                  <Radio
                    sx={{
                      " &.Mui-checked": {
                        color: "red",
                      },
                    }}
                  />
                }
                label="عميد"
              />
            </RadioGroup>

            {!loading ? (
              <Button
                variant="contained"
                sx={{ width: "16rem", marginX: "auto", fontSize: "16px" }}
                type="submit"
              >
                اضافة
              </Button>
            ) : (
              <MoonLoader color="blue" size={30} className="mx-auto" />
            )}
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
