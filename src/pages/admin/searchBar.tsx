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

export const SearchBar = ({
  setActivityModal,
  setUserModal,
  action,
}: {
  setActivityModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
}) => {
  const [nameString, setNameString] = useState<string>("");
  let handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameString(e.target.value);
  };
  const handleSearch = () => {
    console.log(nameString);
  };
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs());
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs());

  const handleChange = (
    newValue: Dayjs | null,
    cb: React.Dispatch<React.SetStateAction<Dayjs | null>>
  ) => {
    cb(newValue);
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
        <IconButton
          onClick={handleSearch}
          size="small"
          aria-aria-label="search"
        >
          <GoSearch />
        </IconButton>
      </div>
      <TextField
        size="small"
        id="activity-type"
        label=" القسم"
        sx={{ backgroundColor: "#F8F4EA", width: "240px" }}
        select
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </TextField>
      {action !== "users" && (
        <div className="flex items-center justify-center gap-4">
          <MobileDatePicker
            label="التاريخ من"
            inputFormat="MM/DD/YYYY"
            value={dateFrom}
            disableFuture
            onChange={(value) => handleChange(value, setDateFrom)}
            renderInput={(params) => (
              <TextField
                sx={{ backgroundColor: "#F8F4EA" }}
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
            onChange={(value) => handleChange(value, setDateTo)}
            renderInput={(params) => (
              <TextField
                sx={{ backgroundColor: "#F8F4EA" }}
                size="small"
                {...params}
              />
            )}
          />
        </div>
      )}
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
          aria-label="add"
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
          aria-label="add"
          onClick={() => setActivityModal(true)}
        >
          <IoAdd className=" text-lg" />
          اضافة نشاط
        </Button>
      </div>
    </Paper>
  );
};
