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
import { boolean } from "yup";
import { useAddUser } from "../api/addUser";
import { useUpdateUser } from "../api/updateUser";
import FocusLock from "react-focus-lock";
import { MoonLoader } from "react-spinners";
export const UpdateUserModal = ({
  setUpdateUserModal,
  userInfo,
  auth,
  setMessage,
  setRefetch,
  setSeverity,
  setOpen,
}: {
  setUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  auth: AUTH;
  userInfo: any;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
}) => {
  const [values, setValues] = useState<any>({
    id: userInfo[0].id,
    name: userInfo[0].name,
    department: userInfo[0].department,
    email: userInfo[0].email,
    phone: userInfo[0].phone_number,

    type: userInfo[0].type,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const { response, updateUser, loading, error } = useUpdateUser(
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
      await updateUser(values);
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
      setMessage("تم تحديث معلومات المستخدم");
      setSeverity("success");
      setOpen(true);
      setRefetch((state: boolean) => !state);
      setUpdateUserModal(false);
      setValues({ supervisor: false });
      formRef?.current?.reset();
    }
  }, [response]);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setUpdateUserModal(false);
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
              label="القسم "
              InputProps={{ sx: { backgroundColor: "white" } }}
              select
              error={errors.department.error}
              helperText={errors.department.message}
              onChange={(e) => handleChange(e, "department")}
              value={values.department}
            >
              <MenuItem value={"عام"}>عام</MenuItem>
              <MenuItem value={"علوم الحاسوب"}>علوم الحاسوب</MenuItem>
              <MenuItem value={"الأمن السيبراني"}>الأمن السيبراني</MenuItem>
              <MenuItem value={"الشبكات"}>الشبكات</MenuItem>
              <MenuItem value={"هندسة البرمجيات"}>هندسة البرمجيات</MenuItem>
              <MenuItem value={"الرياضيات"}>الرياضيات</MenuItem>
              <MenuItem value={"العمادة"}>العمادة</MenuItem>
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
              value={values.name}
              error={errors.name.error}
              helperText={errors.name.message}
              InputProps={{ sx: { backgroundColor: "white" } }}
              onChange={(e) => handleChange(e, "name")}
            />

            <TextField
              label="البريد الالكتروني"
              id="email"
              value={values.email}
              InputProps={{ sx: { backgroundColor: "white" } }}
              size="small"
              onChange={(e) => handleChange(e, "email")}
              error={errors.email.error}
              helperText={errors.email.message}
            />
            <TextField
              label="رقم الهاتف "
              id="phone"
              value={values.phone}
              InputProps={{ sx: { backgroundColor: "white" } }}
              size="small"
              onChange={(e) => handleChange(e, "phone")}
              error={errors.phone.error}
              helperText={errors.phone.message}
            />

            <RadioGroup
              defaultValue={values.type}
              name="radio-buttons-group"
              row
              onChange={(e: any) =>
                setValues((state: any) => {
                  return { ...state, type: e.target.value };
                })
              }
            >
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="مستخدم"
              />
              <FormControlLabel
                value="supervisor"
                control={<Radio />}
                label="رئيس قسم"
              />
              <FormControlLabel
                value="dean"
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
                تعديل
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
            onClick={() => setUpdateUserModal(false)}
          >
            <AiOutlineClose />
          </Button>
        </form>
      </div>
    </FocusLock>
  );
};
