import { useModal } from "common/hooks/useModal";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { Autocomplete, Link, TextField } from "@mui/material";
import { BsFileEarmarkPdf } from "react-icons/bs";
export const Modal = ({
  setModalActivity,
  modalActivity,
}: {
  setModalActivity: React.Dispatch<React.SetStateAction<any>>;
  modalActivity: any;
}) => {
  const mainRef = useRef(null);
  useModal(mainRef, () => setModalActivity(false));
  const handleEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      setModalActivity(false);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  let [current, setCurrent] = useState(0);
  let [data, setData] = useState(modalActivity.response[current]);

  const handleArrowClick = (e: any) => {
    if (e.key === "ArrowRight") {
      console.log(current == modalActivity.response.length - 1);

      current == modalActivity.response.length - 1
        ? setCurrent(0)
        : setCurrent((current: number) => (current += 1));
    } else if (e.key === "ArrowLeft") {
      current == 0
        ? setCurrent(modalActivity.response.length - 1)
        : setCurrent((current: number) => (current -= 1));
    }
  };

  useEffect(() => {
    modalActivity.response.forEach((activity: any, index: number) => {
      if (activity.activity_id === modalActivity.id) {
        setCurrent(index);
      }
    });
  }, []);
  useEffect(() => {
    setData(modalActivity.response[current]);
    document.addEventListener("keydown", handleArrowClick);
    return () => document.removeEventListener("keydown", handleArrowClick);
  }, [current]);
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0  z-50 flex items-center justify-center cursor-pointer ">
      <div
        ref={mainRef}
        className="h-[90%] w-4/5 bg-quan rounded-lg cursor-default flex flex-col items-start justify-start relative p-6 gap-5"
      >
        <div className="flex gap-3 w-full">
          <TextField
            label="العنوان"
            value={data.title}
            size="small"
            inputProps={{ sx: { color: "blue" } }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
                fontWeight: "semibold",
              },
            }}
            disabled
          />
          <TextField
            label="القسم"
            value={data.department}
            size="small"
            inputProps={{ sx: { color: "blue" } }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
                fontWeight: "semibold",
              },
            }}
            disabled
          />
        </div>
        <TextField
          label="النوع"
          value={data.type}
          size="small"
          inputProps={{ sx: { color: "blue" } }}
          sx={{
            width: "100%",
            backgroundColor: "white",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "black",
              fontWeight: "semibold",
            },
          }}
          disabled
        />
        <Autocomplete
          size="small"
          multiple
          disabled
          sx={{ width: "100%" }}
          id="multiple-limit-tags"
          options={data.participants}
          value={data.participants}
          getOptionLabel={(option: {
            name: string;
            email: string;
            id: number;
          }) => `${option.name} (${option.email})`}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: "100%" }}
              InputProps={{
                ...params.InputProps,
                sx: { backgroundColor: "white" },
              }}
              label="اسماء المشاركين"
              placeholder="الاسماء"
            />
          )}
        />
        <div className="flex gap-3 w-full">
          <TextField
            label="تاريخ الكتاب"
            value={data.order_date}
            size="small"
            inputProps={{ sx: { color: "blue" } }}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
                fontWeight: "semibold",
              },
            }}
            disabled
          />
          <TextField
            label=" التاريخ من"
            value={data.start_date}
            size="small"
            inputProps={{ sx: { color: "blue" } }}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
                fontWeight: "semibold",
              },
            }}
            disabled
          />
          <TextField
            label=" التاريخ االى"
            value={data.end_date}
            InputLabelProps={{ shrink: true }}
            size="small"
            inputProps={{ sx: { color: "blue" } }}
            sx={{
              width: "100%",
              backgroundColor: "white",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
                fontWeight: "semibold",
              },
            }}
            disabled
          />
        </div>
        <textarea
          value={data.summary}
          disabled
          placeholder="نبذة عن النشاط"
          className=" resize-none rounded-[3px] h-20 w-full py-2 px-3 border-[1.8px] border-gray-300 hover:border-black focus:border-none"
        />
        <div className="flex items-center gap-2">
          <TextField
            label="نوع النشاط"
            value={data.location}
            size="small"
            inputProps={{ sx: { color: "blue" } }}
            sx={{
              width: "200px",
              backgroundColor: "white",
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
                fontWeight: "semibold",
              },
            }}
            disabled
          />
          {data.link && (
            <Link href={data.link} target="_blank" underline="none">
              الرابط
            </Link>
          )}
        </div>
        <div className="flex gap-2">
          {data.images &&
            data.images.map((image: any, i: number) => {
              return (
                <a
                  href={`http://localhost:5000/${image.url}`}
                  target="_blank"
                  className="w-10 h-10"
                >
                  <img src={`http://localhost:5000/${image.url}`} key={i} />
                </a>
              );
            })}
        </div>
        <div className="flex gap-2">
          {data.files &&
            data.files.map((file: any, i: number) => {
              return (
                <a
                  href={`http://localhost:5000/${file.url}`}
                  target="_blank"
                  className=" flex gap-2"
                >
                  <BsFileEarmarkPdf className="text-3xl text-red-500" />
                  <h3 className="w-32 truncate ">{file.name}</h3>
                </a>
              );
            })}
        </div>
        <div className="absolute bottom-2 left-2 ">
          <Barcode
            font="10px"
            value={data.barcode_id}
            height={20}
            background={"transparent"}
            width={1.4}
          />{" "}
        </div>
      </div>
    </div>
  );
};
