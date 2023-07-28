import React, { MouseEventHandler, useState } from "react";
import {
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { GoSearch } from "react-icons/go";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { IoAdd } from "react-icons/io5";
import Fab from "@mui/material/Fab";
import { AUTH, QUERY } from "types";

export const SearchBar = ({
  setActivityModal,
  setUserModal,
  action,
  query,
  setQuery,
  auth,
}: {
  setActivityModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
  query: QUERY;
  auth: AUTH;
  setQuery: React.Dispatch<React.SetStateAction<QUERY>>;
}) => {
  let handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((state: any) => {
      return { ...state, string: e.target.value };
    });
  };

  return (
    <Paper
      className="w-full h-16 flex items-center justify-between p-4"
      variant="elevation"
      sx={{ backgroundColor: "#ECE8DD" }}
    >
      <div className="flex items-start justify-center gap-3 bg-quan px-3 py-1 rounded-full">
        <InputBase
          type="text"
          placeholder="بحث"
          onChange={handleNameChange}
        ></InputBase>
        <IconButton size="small">
          <GoSearch />
        </IconButton>
      </div>

      <div className="flex items-center justify-center gap-4">
        {" "}
        {action !== "users" && (
          <TextField
            size="small"
            id="type"
            label=" النوع"
            sx={{ backgroundColor: "#F8F4EA", width: "200px" }}
            select
            value={query.type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery((state: any) => {
                return { ...state, type: e.target.value };
              })
            }
          >
            <MenuItem value={""}>الكل</MenuItem>
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
        )}
        {(auth.type === "admin" || auth.type === "dean") && (
          <TextField
            size="small"
            id="department"
            label=" القسم"
            sx={{ backgroundColor: "#F8F4EA", width: "200px" }}
            select
            SelectProps={{
              multiple: true,
            }}
            value={query.department}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery((state: any) => {
                return { ...state, department: e.target.value };
              })
            }
          >
            <MenuItem value={"مشترك"}>مشترك </MenuItem>
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
        )}
      </div>

      {action !== "users" && (
        <div className="flex items-center justify-center gap-4">
          <MobileDatePicker
            label="التاريخ من"
            inputFormat="DD/MM/YYYY"
            value={query.dateFrom}
            componentsProps={{
              actionBar: {
                actions: ["clear", "accept"],
              },
            }}
            onAccept={(newDate) => {
              setQuery((state: any) => {
                return {
                  ...state,
                  dateFrom: newDate
                    ? dayjs(newDate).format("YYYY/MM/DD")
                    : null,
                };
              });
            }}
            onChange={(value: string | null) =>
              setQuery((state: any) => {
                return {
                  ...state,
                  dateFrom: dayjs(value).format("YYYY/MM/DD"),
                };
              })
            }
            renderInput={(params) => (
              <TextField
                sx={{ backgroundColor: "#F8F4EA", width: "120px" }}
                size="small"
                {...params}
              />
            )}
          />
          <MobileDatePicker
            label="التاريخ الى"
            inputFormat="DD/MM/YYYY"
            componentsProps={{
              actionBar: {
                actions: ["clear", "accept"],
              },
            }}
            onAccept={(newDate) => {
              setQuery((state: any) => {
                return {
                  ...state,
                  dateTo: newDate ? dayjs(newDate).format("YYYY/MM/DD") : null,
                };
              });
            }}
            value={query.dateTo}
            minDate={query.dateFrom ? query.dateFrom : dayjs()}
            onChange={(value: string | null | number) =>
              setQuery((state: any) => {
                return { ...state, dateTo: dayjs(value).format("YYYY/MM/DD") };
              })
            }
            renderInput={(params) => (
              <TextField
                sx={{ backgroundColor: "#F8F4EA", width: "120px" }}
                size="small"
                {...params}
              />
            )}
          />
        </div>
      )}
      {auth.type === "admin" && (
        <div className="flex gap-4">
          <Button
            size="small"
            sx={{
              backgroundColor: "#F8F4EA",
              fontWeight: "500",
              zIndex: "1",
              fontSize: "16px",
              boxShadow: "4",
            }}
            onClick={() => setUserModal(true)}
          >
            <IoAdd className=" text-lg" />
            اضافة مستخدم
          </Button>

          <Button
            size="small"
            sx={{
              backgroundColor: "#579BB1",
              fontWeight: "500",
              zIndex: "1",
              fontSize: "16px",
              color: "white",
              boxShadow: "4",
              "&:hover": { backgroundColor: "#74b0c4" },
            }}
            onClick={() => setActivityModal(true)}
          >
            <IoAdd className=" text-lg" />
            اضافة نشاط
          </Button>
        </div>
      )}
    </Paper>
  );
};
