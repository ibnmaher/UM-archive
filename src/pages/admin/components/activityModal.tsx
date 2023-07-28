import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { BeatLoader, MoonLoader } from "react-spinners";
import { AUTH } from "types";
import { addActivitySchema } from "utils/addActivitySchema";
import { validationFunction } from "utils/validationFunction";
import { yupErrorHandler } from "utils/yupErrorHandler";
import { useAddActivity } from "../api/addActivity";
import activityModalErrors from "../objects/activityModalErrors";
import { FileInput } from "./fileInput";
import { UsersInput } from "./usersInput";
import FocusLock from "react-focus-lock";
import { PdfInput } from "./pdfInput";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { Message } from "common/components/message";
interface PROPS {
  setActivityModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  setSeverity: React.Dispatch<
    React.SetStateAction<"success" | "info" | "warning" | "error">
  >;
  auth: AUTH;
}
export const ActivityModal = ({
  setActivityModal,
  setOpen,
  setMessage,
  setSeverity,
  refetch,
  setRefetch,
  auth,
}: PROPS) => {
  const { error, response, addActivity, loading } = useAddActivity(
    {},
    { Authorization: `Bearer ${auth.token}` }
  );

  const [dateFrom, setDateFrom] = React.useState<Dayjs | string | null>(
    dayjs().format("YYYY/MM/DD")
  );
  const [dateTo, setDateTo] = React.useState<Dayjs | string | null>(
    dayjs().format("YYYY/MM/DD")
  );
  const [orderDate, setOrderDate] = React.useState<Dayjs | string | null>(
    dayjs().format("YYYY/MM/DD")
  );
  const [files, setFiles] = useState<any[]>([]);
  const [pdf, setPdf] = useState<any[]>([]);
  const [errors, setErrors] = useState(activityModalErrors);
  console.log(dateFrom);
  const [values, setValues] = useState<any>({
    type: "",
    department: [],
    link: "",
    barcode: "",
    location: "نشاط داخلي",
    participants: [],
    dateFrom,
    dateTo,
    orderDate,
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
        if (key === "participants" || key === "department") {
          data.append(`${key}`, JSON.stringify(values[key]));
        } else {
          data.append(`${key}`, values[key]);
        }
      });

      files.map((file) => {
        data.append("images", file.image);
        data.append("privateOptin", file.private);
      });
      pdf.map((pdf) => {
        data.append("pdf", pdf.file);
      });
      await validationFunction(addActivitySchema, values);
      addActivity(data);
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
    if (response?.status) {
      setOpen(true);
      setMessage("تم اضافة نشاط");
      setSeverity("success");
      setActivityModal(false);
      setRefetch((state: boolean) => !state);
    }

    if (error) {
      setOpen(true);
      setMessage("حدث خطأ");
      setSeverity("error");
    }
  }, [response, error]);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setActivityModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  return (
    <FocusLock>
      <form
        onSubmit={handleSubmit}
        className=" w-full h-screen pb-10 overflow-y-auto pt-64 bg-quan rounded-lg cursor-default flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-50"
      >
        <FormControl
          fullWidth
          sx={{
            width: "60%",
            display: "flex",

            flexDirection: "column",

            gap: "16px",
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
            <MenuItem value="مناقشة طلبة الدراسات الأولية أو العليا">
              مناقشة طلبة الدراسات الأولية أو العليا
            </MenuItem>
            <MenuItem value="تكليف بالتدريس في الدراسات الأولية أو العليا">
              تكليف بالتدريس في الدراسات الأولية أو العليا
            </MenuItem>
            <MenuItem value="الاشراف على طلبة الدراسات الأولية أو العليا">
              الاشراف على طلبة الدراسات الأولية أو العليا
            </MenuItem>
            <MenuItem value="حضور المحافل العلمية (مؤتمرات ــ ندوات ــ ورش عمل أو سيمنارات ـ فعاليات تكريم)">
              حضور المحافل العلمية (مؤتمرات ــ ندوات ــ ورش عمل أو سيمنارات ـ
              فعاليات تكريم)
            </MenuItem>
            <MenuItem value="الدورات التدريبية">الدورات التدريبية</MenuItem>
            <MenuItem value="المشاركة بدورات التعليم المستمر ــ بصفة مشترك">
              المشاركة بدورات التعليم المستمر ــ بصفة مشترك
            </MenuItem>
            <MenuItem value="إلقاء محاضرات ــ سيمينارات">
              إلقاء محاضرات ــ سيمينارات
            </MenuItem>
            <MenuItem value="نشر بحث">نشر بحث</MenuItem>
            <MenuItem value="العضوية في اللجان الدائمة">
              العضوية في اللجان الدائمة
            </MenuItem>
            <MenuItem value="العضوية في اللجان المؤقتة">
              العضوية في اللجان المؤقتة
            </MenuItem>
            <MenuItem value="التعاون مع مؤسسات الدولة الأخرى">
              التعاون مع مؤسسات الدولة الأخرى
            </MenuItem>
            <MenuItem value="التعاون مع المؤسسات الخاصة (خدمة المجتمع)">
              التعاون مع المؤسسات الخاصة (خدمة المجتمع)
            </MenuItem>
            <MenuItem value="المشاركة في حملات التشجير">
              المشاركة في حملات التشجير
            </MenuItem>
            <MenuItem value="إقامة معارض فنية واعمال يدوية">
              إقامة معارض فنية واعمال يدوية{" "}
            </MenuItem>
            <MenuItem value=" زيارات دور الدولة للمسنين والايتام وتقديم المساعدات لهم">
              زيارات دور الدولة للمسنين والايتام وتقديم المساعدات
            </MenuItem>
            <MenuItem value="النشاطات الخيرية">النشاطات الخيرية</MenuItem>
            <MenuItem value="الاشراف على النشاطات الطلابية (المسابقات ــ المخيمات الكشفية ــ الرحلات العلمية)">
              الاشراف على النشاطات الطلابية (المسابقات ــ المخيمات الكشفية ــ
              الرحلات العلمية)
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
            <DatePicker
              label="تاريخ الامر"
              inputFormat="DD/MM/YYYY"
              value={orderDate}
              InputProps={{
                sx: {
                  backgroundColor: "white",
                  ".MuiFormHelperText-root": { color: "red" },
                },
              }}
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
            <DatePicker
              label="التاريخ من"
              inputFormat="DD/MM/YYYY"
              value={dateFrom}
              onChange={(value) => {
                setDateFrom(value);
                setDateTo(value)
                setValues((values: any) => {
                  return {
                    ...values,
                    dateFrom: dayjs(value).format("YYYY/MM/DD"),
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
            <DatePicker
              label="التاريخ الى"
              inputFormat="DD/MM/YYYY"
              value={dateTo}
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
            SelectProps={{
              multiple: true,
            }}
            onChange={(e: any) =>
              setValues((values: any) => {
                return { ...values, department: e.target.value };
              })
            }
          >
            <MenuItem value={"مشترك"}>مشترك </MenuItem>
            <MenuItem value={"علوم الحاسوب"}>علوم الحاسوب</MenuItem>
            <MenuItem value={"الأمن السيبراني"}>الأمن السيبراني</MenuItem>
            <MenuItem value={"الشبكات"}>الشبكات</MenuItem>
            <MenuItem value={"هندسة البرمجيات"}>هندسة البرمجيات</MenuItem>
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
            setValues={setValues}
            errors={errors}
            auth={auth}
          />
          <textarea
            onChange={(e) => handleChange(e, "summary")}
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
            {files.map((image, index) => {
              return (
                <div className="w-10 h-10 relative" key={index}>
                  <IconButton
                    size="small"
                    sx={{ position: "absolute", top: "-10px", left: "-10px" }}
                    onClick={() => handleRemoveImage(index, "file")}
                  >
                    <TiDelete className="text-red-700" />
                  </IconButton>
                  <a href={image.url} target="_blank" className="w-10 h-10">
                    <img src={image.url} />
                  </a>
                </div>
              );
            })}
          </div>
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
                  <a href={pdf.url} target="_blank" className="w-10 h-10">
                    <BsFileEarmarkPdf className="text-red-600 text-3xl" />
                  </a>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row-reverse justify-between">
            <RadioGroup
              row
              aria-labelledby="activity-type"
              name="row-radio-buttons-group"
              defaultValue="نشاط داخلي"
              onChange={(e) => handleChange(e, "location")}
            >
              <FormControlLabel
                value="نشاط داخلي"
                control={<Radio />}
                label="نشاط داخلي"
              />
              <FormControlLabel
                value="نشاط خارجي"
                control={<Radio />}
                label="نشاط خارجي"
              />
            </RadioGroup>
            <TextField
              label="الرمز الشريطي"
              id="barcode"
              sx={{ backgroundColor: "white", width: "50%" }}
              size="small"
              value={values.barcode}
              onChange={(e) => handleChange(e, "barcode")}
            />
          </div>
          {loading ? (
            <MoonLoader color="blue" size={30} className="mx-auto" />
          ) : (
            <Button
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
          onClick={() => setActivityModal(false)}
        >
          <AiOutlineClose />
        </Button>
      </form>
    
    </FocusLock>
  );
};
