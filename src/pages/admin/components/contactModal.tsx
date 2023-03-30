import { Button, FormControl, Modal, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AUTH } from "types";
import { useDeleteActivity } from "../api/deleteActivity";
import { useDeleteUser } from "../api/deleteUser";
import { CgFileRemove } from "react-icons/cg";
import { useSendEmail } from "../api/sendEmail";
import { validationFunction } from "utils/validationFunction";
import { contactSchema } from "utils/contactSchema";
import { yupErrorHandler } from "utils/yupErrorHandler";
interface PARAMS {
  auth: AUTH;

  setContactModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
}
interface VALUES {
  subject: string;
  email: string;
  file_name: string;
  image_name: string;
  file: any;
  image: any;
}
export const ContactModal = ({
  auth,
  setContactModal,
  setOpen,
  setSeverity,
  setMessage,
}: PARAMS) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<VALUES>({
    subject: "",
    email: auth.email,
    file: "",
    image: "",
    file_name: "",
    image_name: "",
  });
  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: "",
    },
    subject: {
      error: false,
      message: "",
    },
  });
  const { sendEmail, loading, error, response } = useSendEmail(
    {},
    { Authorization: `Bearer ${auth.token}` }
  );
  useEffect(() => {
    if (response) {
      if (response?.status === 200) {
        setOpen(true);
        setMessage("تم ارسال البريد");
        setSeverity("success");
        setContactModal(false);
      } else {
        setOpen(true);
        setMessage(" حدث خطأ ");
        setSeverity("error");
      }
    }
  }, [response]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
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
      subject: {
        error: false,
        message: "",
      },
    });
    try {
      await validationFunction(contactSchema, values);
      let data = new FormData();
      Object.keys(values).map((key: string) => {
        data.append(`${key}`, values[key as keyof typeof values]);
      });
      sendEmail(data);
    } catch (err: any) {
      yupErrorHandler(err.inner, setErrors);
    }
  };
  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setContactModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <Modal
      open={true}
      onClose={() => setContactModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form className="w-[480px] h-[400px] rounded-lg flex flex-col gap-4 items-center justify-center bg-tertiary p-6">
        <TextField
          label="البريد الالكتروني"
          id="email"
          sx={{ width: "100%" }}
          InputProps={{ sx: { backgroundColor: "white" } }}
          size="small"
          InputLabelProps={{ shrink: true }}
          error={errors.email.error}
          helperText={errors.email.message}
          disabled
          value={auth?.email}
          required
        />

        <TextField
          label="الموضوع"
          id="subject"
          sx={{ width: "100%", height: "80px" }}
          InputProps={{ sx: { backgroundColor: "white", height: "80px" } }}
          size="small"
          error={errors.subject.error}
          helperText={errors.subject.message}
          onChange={(e) => handleChange(e, "subject")}
        />
        <TextField
          inputProps={{ accept: "image/png, image/jpeg" }}
          label="الصور"
          id="image"
          type="file"
          value={values.image_name}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          InputProps={{
            sx: { backgroundColor: "white" },
            endAdornment: values.image && (
              <CgFileRemove
                className="cursor-pointer text-red-600"
                onClick={() =>
                  setValues((state: any) => {
                    return { ...state, image_name: "", image: "" };
                  })
                }
              />
            ),
          }}
          size="small"
          onChange={(e: any) =>
            setValues((state: any) => {
              return {
                ...state,
                image: e.target.files[0],
                image_name: e.target.value,
              };
            })
          }
        />
        <TextField
          inputProps={{ accept: "application/pdf" }}
          label="الملف"
          id="file"
          ref={fileRef}
          type="file"
          value={values.file_name}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "100%", position: "relative" }}
          InputProps={{
            sx: { backgroundColor: "white" },
            endAdornment: values.file && (
              <CgFileRemove
                className="cursor-pointer text-red-600"
                onClick={() =>
                  setValues((state: any) => {
                    return { ...state, file: "" };
                  })
                }
              />
            ),
          }}
          size="small"
          onChange={(e: any) =>
            setValues((state: any) => {
              return {
                ...state,
                file: e.target.files[0],
                file_name: e.target.value,
              };
            })
          }
        />

        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          onClick={handleSubmit}
        >
          ارسال
        </Button>
      </form>
    </Modal>
  );
};
