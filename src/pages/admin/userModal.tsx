import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useModal } from "common/hooks/useModal";
import React, { useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AiOutlineClose } from "react-icons/ai";
export const UserModal = ({
  setUserModal,
}: {
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs());
  const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs());
  const [values, setValues] = useState<any>({
    activityType: "محاضرة",
  });
  const handleChange = (e: any, name: string) => {
    setValues((values: any) => {
      return { ...values, [name]: e.target.value };
    });
  };
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0  z-50 flex items-center justify-center cursor-pointer ">
      <div className=" h-4/5 w-4/5 bg-quan rounded-lg cursor-default flex items-center justify-center relative">
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
            id="activity-type"
            value={values.activityType}
            label="القسم "
            sx={{ backgroundColor: "white" }}
            select
            onChange={(e) => handleChange(e, "activityType")}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
          <TextField
            label="الاسم"
            id="activity-title"
            sx={{ backgroundColor: "white" }}
            size="small"
          />

          <TextField
            label="البريد الالكتروني"
            id="activity-title"
            sx={{ backgroundColor: "white" }}
            size="small"
          />

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="مشرف"
          />

          <Button
            variant="contained"
            sx={{ width: "16rem", marginX: "auto", fontSize: "16px" }}
          >
            اضافة
          </Button>
        </FormControl>
        <Button
          color="error"
          sx={{ position: "absolute", backgroundColor: "white", boxShadow: 1 }}
          className="top-4 right-4"
          onClick={() => setUserModal(false)}
        >
          <AiOutlineClose />
        </Button>
      </div>
    </div>
  );
};
