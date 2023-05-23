import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";

export const FileInput = ({
  setFiles,
}: {
  setFiles: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [file, setFile] = React.useState<any>({
    image: null,
    private: false,
    url: "",
  });

  const handleAdd = () => {
    if (file.image.size > 4000000) {
      alert("(4MB) حجم الملف اكبر من المسموح");
      return;
    }
    setFiles((state: any) => {
      return [...state, file];
    });
    setFile({
      image: null,
      private: true,
      url: "",
    });
    if (Ref.current) {
      Ref.current.value = "";
    }
  };
  const Ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex gap-2 w-full">
      <TextField
        ref={Ref}
        label="رفع صورة"
        id="image"
        type="file"
        inputProps={{ multiple: false, accept: "image/*" }}
        sx={{ backgroundColor: "white", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        size="small"
        onChange={(e: any) => {
          if (e.target.files.length !== 0) {
            setFile((state: any) => {
              return {
                ...state,
                image: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
              };
            });
          }
        }}
      />
      {/* <FormControlLabel
        control={
          <Checkbox
            checked={file.private}
            onChange={() =>
              setFile((state: any) => {
                return { ...state, private: !state.private };
              })
            }
          />
        }
        label="خاص"
      /> */}
      <Button onClick={handleAdd} disabled={!file.image} variant="text">
        اضافة
      </Button>
    </div>
  );
};
