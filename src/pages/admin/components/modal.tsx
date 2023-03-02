import { useModal } from "common/hooks/useModal";
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { Autocomplete, Link, TextField } from "@mui/material";

export const Modal = ({
  setModalActivity,
  modalActivity,
}: {
  setModalActivity: React.Dispatch<React.SetStateAction<any>>;
  modalActivity: any;
}) => {
  console.log(modalActivity[0]);
  const mainRef = useRef(null);
  useModal(mainRef, () => setModalActivity(false));
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-40 top-0 bottom-0 left-0 right-0  z-50 flex items-center justify-center cursor-pointer ">
      <div
        ref={mainRef}
        className="h-4/5 w-4/5 bg-quan rounded-lg cursor-default flex flex-col items-start justify-start relative p-6 gap-5"
      >
        <div className="flex gap-3 w-full">
          <TextField
            label="العنوان"
            value={modalActivity[0].title}
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
            value={modalActivity[0].department}
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
        <Autocomplete
          size="small"
          multiple
          disabled
          sx={{ width: "100%" }}
          id="multiple-limit-tags"
          options={modalActivity[0].participants}
          value={modalActivity[0].participants}
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
            value={modalActivity[0].order_date}
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
            label=" التاريخ من"
            value={modalActivity[0].start_date}
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
            label=" التاريخ االى"
            value={modalActivity[0].end_date}
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
          value={modalActivity[0].summary}
          disabled
          placeholder="نبذة عن النشاط"
          className=" resize-none rounded-[3px] h-20 w-full py-2 px-3 border-[1.8px] border-gray-300 hover:border-black focus:border-none"
        />
        <div className="flex items-center gap-2">
          <TextField
            label="نوع النشاط"
            value={modalActivity[0].location}
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
          {modalActivity[0].link && (
            <Link href={modalActivity[0].link} target="_blank" underline="none">
              الرابط
            </Link>
          )}
        </div>
        <div className="flex gap-2">
          {modalActivity[0].images[0].url &&
            modalActivity[0].images.map((image: any, i: number) => {
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
        <div className="absolute bottom-2 left-2 ">
          <Barcode
            font="10px"
            value={modalActivity[0].barcode_id}
            height={20}
            background={"transparent"}
            width={1.4}
          />{" "}
        </div>
      </div>
    </div>
  );
};
