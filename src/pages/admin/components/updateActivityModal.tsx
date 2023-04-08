import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { AiOutlineClose } from "react-icons/ai";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { MoonLoader } from "react-spinners";
import { AUTH } from "types";
import { addActivitySchema } from "utils/addActivitySchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { useUpdateActivity } from "../api/updateActivity";
import activityModalErrors from "../objects/activityModalErrors";
import { FileInput } from "./fileInput";
import { PdfInput } from "./pdfInput";
import { UsersInput } from "./usersInput";
interface PROPS {
  setUpdateActivityModal: React.Dispatch<React.SetStateAction<any>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  refetch: boolean;
  activityInfo: any;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
  auth: AUTH;
}

export const UpdateActivityModal = ({
  setOpen,
  setMessage,
  setSeverity,
  refetch,
  activityInfo,
  setRefetch,
  auth,
  setUpdateActivityModal,
}: PROPS) => {
  const { error, response, updateActivity, loading } = useUpdateActivity(
    {},
    { Authorization: `Bearer ${auth.token}` }
  );
  const [pdf, setPdf] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(
    dayjs(activityInfo[0].start_date)
  );
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(
    dayjs(activityInfo[0].end_date)
  );
  const [orderDate, setOrderDate] = React.useState<Dayjs | null>(
    dayjs(activityInfo[0].order_date)
  );
  const [files, setFiles] = useState<any>([]);
  const [errors, setErrors] = useState(activityModalErrors);

  const [values, setValues] = useState<any>({
    id: activityInfo[0].id,
    title: activityInfo[0].title || "",
    type: activityInfo[0].type || "",
    department: activityInfo[0].department || "",
    link: activityInfo[0].link || "",
    barcode: activityInfo[0].barcode_id || "",
    location: activityInfo[0].location || "نشاط خارجي",
    summary: activityInfo[0].summary || "",
    participants: activityInfo[0].participants,
    orderDate: activityInfo[0].order_date,
    dateFrom: activityInfo[0].start_date,
    dateTo: activityInfo[0].end_date,
    deleteImages: false,
    deleteFiles: false,
  });

  const handleChange = (e: any, name: string) => {
    setValues((values: any) => {
      return { ...values, [name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors(activityModalErrors);
    try {
      let data = new FormData();
      Object.keys(values).map((key: string) => {
        if (key === "participants") {
          data.append(`${key}`, JSON.stringify(values[key]));
        } else {
          data.append(`${key}`, values[key]);
        }
      });

      files.map((file: any) => {
        data.append("images", file.image);
        data.append("privateOptin", file.private);
      });
      pdf.map((pdf) => {
        data.append("pdf", pdf.file);
      });
      await validationFunction(addActivitySchema, values);
      updateActivity(data);
    } catch (err: any) {
      yupErrorHandler(err.inner, setErrors);
    }
  };

  const handleRemoveImage = (index: number, type: string) => {
    if (type === "file") {
      setFiles((state: any) => {
        let newState = [...state];
        newState.splice(index, 1);

        return newState;
      });
    } else {
      setPdf((state: any) => {
        let newState = [...state];
        newState.splice(index, 1);

        return newState;
      });
    }
  };
  useEffect(() => {
    console.log("jjj", response);
    if (response?.status) {
      setOpen(true);
      setMessage("تم تعديل النشاط");
      setSeverity("success");
      setRefetch((state: boolean) => !state);
      setUpdateActivityModal(false);
    }
    if (error) {
      setOpen(true);
      setMessage("حدث خطأ");
      setSeverity("error");
    }
  }, [response, error]);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setUpdateActivityModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <FocusLock>
      <div className="fixed w-full  bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0  z-50 flex items-center justify-center cursor-pointer ">
        <form
          onSubmit={handleSubmit}
          className="  max-h-screen overflow-y-scroll pt-64 pb-12 w-full bg-quan rounded-lg cursor-default flex items-center justify-center relative"
        >
          <FormControl
            fullWidth
            sx={{
              width: "60%",
              display: "flex",

              flexDirection: "column",
              height: "100%",
              gap: "16px",
              marginTop: "100px",
            }}
          >
            <TextField
              size="small"
              id="type"
              value={values.type}
              error={errors.type.error}
              helperText={errors.type.message}
              label="نوع النشاط"
              InputProps={{ sx: { backgroundColor: "white" } }}
              select
              onChange={(e) => handleChange(e, "type")}
            >
              <MenuItem value="مناقشات طلبة الدراسات العليا">
                مناقشات طلبة الدراسات العليا
              </MenuItem>
              <MenuItem value="المحاضرات (السيمينارات)">
                المحاضرات (السيمينارات)
              </MenuItem>
              <MenuItem value="الاجتماعات واللقاءات">
                الاجتماعات واللقاءات
              </MenuItem>
              <MenuItem value="الدورات التدريبية">الدورات التدريبية</MenuItem>
              <MenuItem value="الحلقات الدراسية">الحلقات الدراسية</MenuItem>
              <MenuItem value="ورش العمل">ورش العمل</MenuItem>
              <MenuItem value="فعاليات التكريم">فعاليات التكريم</MenuItem>
              <MenuItem value="الندوات العلمية">الندوات العلمية</MenuItem>
              <MenuItem value="النشاطات اللاصفية">النشاطات اللاصفية</MenuItem>
              <MenuItem value="الجامعة وخدمة المجتمع">
                الجامعة وخدمة المجتمع
              </MenuItem>
            </TextField>
            <TextField
              label="العنوان"
              id="title"
              InputProps={{ sx: { backgroundColor: "white" } }}
              size="small"
              value={values.title}
              error={errors.title.error}
              helperText={errors.title.message}
              onChange={(e) => handleChange(e, "title")}
            />
            <div className="flex items-center w-full justify-center gap-4">
              <MobileDatePicker
                label="تاريخ الامر"
                inputFormat="MM/DD/YYYY"
                value={orderDate}
                disableFuture
                InputProps={{ sx: { backgroundColor: "white" } }}
                onChange={(value) => {
                  setOrderDate(value);
                  setValues((values: any) => {
                    return {
                      ...values,
                      orderDate: dayjs(value).format("YYYY/MM/DD"),
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    error={errors.orderDate.error}
                    helperText={errors.orderDate.message}
                    {...params}
                  />
                )}
              />
              <MobileDatePicker
                label="التاريخ من"
                inputFormat="MM/DD/YYYY"
                value={dateFrom}
                disableFuture
                onChange={(value) => {
                  setDateFrom(value);
                  setValues((values: any) => {
                    return {
                      ...values,
                      dateFrom: dayjs(value).format("YYYY/MM/DD"),
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ backgroundColor: "white", width: "100%" }}
                    size="small"
                    {...params}
                  />
                )}
              />
              <MobileDatePicker
                label="التاريخ الى"
                inputFormat="MM/DD/YYYY"
                value={dateTo}
                disableFuture
                minDate={dateFrom ? dateFrom : dayjs()}
                onChange={(value) => {
                  setDateTo(value);
                  setValues((values: any) => {
                    return {
                      ...values,
                      dateTo: dayjs(value).format("YYYY/MM/DD"),
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ backgroundColor: "white", width: "100%" }}
                    size="small"
                    {...params}
                  />
                )}
              />
            </div>

            <TextField
              label="القسم"
              id="department"
              value={values.department}
              error={errors.department.error}
              helperText={errors.department.message}
              InputProps={{ sx: { backgroundColor: "white" } }}
              size="small"
              select
              onChange={(e) => handleChange(e, "department")}
            >
              <MenuItem value={"مشترك"}>مشترك </MenuItem>
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
            <UsersInput
              values={values}
              defalutValues={activityInfo[0].participants}
              setValues={setValues}
              errors={errors}
              auth={auth}
            />
            <textarea
              onChange={(e) => handleChange(e, "summary")}
              defaultValue={values.summary}
              placeholder="نبذة عن النشاط"
              className=" resize-none rounded-[3px] h-20 w-full py-2 px-3 border-[1.8px] border-gray-300 hover:border-black focus:border-none"
            />
            <TextField
              label="الروابط "
              id="link"
              value={values.link}
              InputProps={{ sx: { backgroundColor: "white" } }}
              size="small"
              onChange={(e) => handleChange(e, "link")}
            />

            <FileInput setFiles={setFiles} />
            <div className="flex gap-1 w-full">
              {files.map((image: any, index: number) => {
                return (
                  <div className="w-10 h-10 relative" key={index}>
                    <IconButton
                      size="small"
                      sx={{ position: "absolute", top: "-10px", left: "-10px" }}
                      onClick={() => handleRemoveImage(index, "file")}
                    >
                      <TiDelete className="text-red-700" />
                    </IconButton>
                    <img src={image.url} alt="" />
                  </div>
                );
              })}
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={false}
                  onChange={() =>
                    setValues((state: any) => {
                      return { ...state, deleteImages: !state.private };
                    })
                  }
                />
              }
              label="مسح الصور السابقة"
            />
            <PdfInput setPdf={setPdf} />
            <div className="flex gap-1 w-full">
              {pdf.map((pdf, index) => {
                return (
                  <div className="w-10 h-10 relative" key={index}>
                    <IconButton
                      size="small"
                      sx={{ position: "absolute", top: "-10px", left: "-10px" }}
                      onClick={() => handleRemoveImage(index, "pdf")}
                    >
                      <TiDelete className="text-red-700" />
                    </IconButton>
                    <a
                      href={pdf.url}
                      target="_blank"
                      className="w-10 h-10"
                      rel="noreferrer"
                    >
                      <BsFileEarmarkPdf className="text-red-600 text-3xl" />
                    </a>
                  </div>
                );
              })}
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={false}
                  onChange={() =>
                    setValues((state: any) => {
                      return { ...state, deleteFiles: !state.deleteFiles };
                    })
                  }
                />
              }
              label="مسح الملفات السابقة"
            />
            <div className="flex flex-row-reverse justify-between">
              <RadioGroup
                row
                aria-labelledby="activity-type"
                name="row-radio-buttons-group"
                defaultValue={values.location}
                onChange={(e) => handleChange(e, "location")}
              >
                <FormControlLabel
                  value="نشاط خارجي"
                  control={<Radio />}
                  label="نشاط خارجي"
                />
                <FormControlLabel
                  value="نشاط داخلي"
                  control={<Radio />}
                  label="نشاط داخلي"
                />
              </RadioGroup>
              <TextField
                label="الرمز الشريطي"
                disabled
                id="barcode"
                defaultValue={values.barcode}
                sx={{ backgroundColor: "white", width: "50%" }}
                size="small"
              />
            </div>
            {loading ? (
              <MoonLoader color="blue" size={30} className="mx-auto" />
            ) : (
              <Button
                disabled={loading}
                variant="contained"
                sx={{ width: "16rem", marginX: "auto", fontSize: "16px" }}
                type="submit"
              >
                رفـــــع
              </Button>
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
            onClick={() => setUpdateActivityModal(false)}
          >
            <AiOutlineClose />
          </Button>
        </form>
      </div>
    </FocusLock>
  );
};
