import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";

export const PdfInput = ({
  setPdf,
}: {
  setPdf: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [file, setFile] = React.useState<any>({ file: "", url: "" });

  const handleAdd = () => {
    if (file.file.size > 400000) {
      alert("(4MB) حجم الملف اكبر من المسموح");
      return;
    }
    setPdf((state: any) => {
      return [...state, file];
    });
    setFile({ file: "", url: "" });
    if (Ref.current) {
      Ref.current.value = "";
    }
  };
  const Ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex gap-2 w-full">
      <TextField
        ref={Ref}
        label="رفع ملف"
        id="pdf"
        type="file"
        inputProps={{ multiple: false, accept: ".pdf" }}
        sx={{ backgroundColor: "white", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        size="small"
        onChange={(e: any) => {
          if (e.target.files.length !== 0) {
            setFile((state: any) => {
              return {
                ...state,
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
              };
            });
          }
        }}
      />

      <Button onClick={handleAdd} disabled={!file.file} variant="text">
        اضافة
      </Button>
    </div>
  );
};
