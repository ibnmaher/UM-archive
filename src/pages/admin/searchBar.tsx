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
  const handleSearch = () => {
    console.log(query);
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
        <IconButton onClick={handleSearch} size="small">
          <GoSearch />
        </IconButton>
      </div>
      {auth.type === "admin" && (
        <TextField
          size="small"
          id="department"
          label=" القسم"
          sx={{ backgroundColor: "#F8F4EA", width: "200px" }}
          select
          value={query.department}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery((state: any) => {
              return { ...state, department: e.target.value };
            })
          }
        >
          <MenuItem value={""}>الكل</MenuItem>
          <MenuItem value={"علوم حاسبات"}>علوم حاسبات</MenuItem>
          <MenuItem value={"هندسة"}>هندسة</MenuItem>
          <MenuItem value={"تربية"}>تربية</MenuItem>
        </TextField>
      )}
      {action !== "users" && (
        <div className="flex items-center justify-center gap-4">
          <MobileDatePicker
            label="التاريخ من"
            inputFormat="MM/DD/YYYY"
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
            disableFuture
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
                sx={{ backgroundColor: "#F8F4EA", width: "200px" }}
                size="small"
                {...params}
              />
            )}
          />
          <MobileDatePicker
            label="التاريخ الى"
            inputFormat="MM/DD/YYYY"
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
            disableFuture
            minDate={query.dateFrom ? query.dateFrom : dayjs()}
            onChange={(value: string | null | number) =>
              setQuery((state: any) => {
                return { ...state, dateTo: dayjs(value).format("YYYY/MM/DD") };
              })
            }
            renderInput={(params) => (
              <TextField
                sx={{ backgroundColor: "#F8F4EA", width: "200px" }}
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
