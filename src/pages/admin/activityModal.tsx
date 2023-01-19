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
export const ActivityModal = ({
  setActivityModal,
}: {
  setActivityModal: React.Dispatch<React.SetStateAction<boolean>>;
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
      <div className=" h-[90%] w-4/5 bg-quan rounded-lg cursor-default flex items-center justify-center relative">
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
            label="نوع النشاط"
            sx={{ backgroundColor: "white" }}
            select
            onChange={(e) => handleChange(e, "activityType")}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
          <TextField
            label="العنوان"
            id="activity-title"
            sx={{ backgroundColor: "white" }}
            size="small"
          />
          <div className="flex items-center w-full justify-center gap-4">
            <MobileDatePicker
              label="التاريخ من"
              inputFormat="MM/DD/YYYY"
              value={dateFrom}
              disableFuture
              onChange={(value) =>
                setValues((values: any) => {
                  return {
                    ...values,
                    dateFrom: value,
                  };
                })
              }
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
              onChange={(value) =>
                setValues((values: any) => {
                  return {
                    ...values,
                    dateTo: value,
                  };
                })
              }
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
            id="activity-title"
            sx={{ backgroundColor: "white" }}
            size="small"
            select
          />
          <textarea
            placeholder="نبذة عن النشاط"
            className=" resize-none rounded-[3px] h-20 w-full py-2 px-3 border-[1.8px] border-gray-300 hover:border-black focus:border-none"
          />
          <TextField
            label="رابط المرفقات"
            id="activity-title"
            sx={{ backgroundColor: "white" }}
            size="small"
          />
          <div className="flex w-full gap-4">
            <TextField
              label="رفع صورة"
              id="activity-title"
              type="file"
              sx={{ backgroundColor: "white", width: "100%" }}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="خاص"
            />
          </div>
          <RadioGroup
            row
            aria-labelledby="activity-type"
            name="row-radio-buttons-group"
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
          <Button
            variant="contained"
            sx={{ width: "16rem", marginX: "auto", fontSize: "16px" }}
          >
            رفـــــع
          </Button>
        </FormControl>
        <Button
          color="error"
          sx={{ position: "absolute", backgroundColor: "white", boxShadow: 1 }}
          className="top-4 right-4"
          onClick={() => setActivityModal(false)}
        >
          <AiOutlineClose />
        </Button>
      </div>
    </div>
  );
};
