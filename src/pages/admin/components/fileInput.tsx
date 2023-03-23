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
        inputProps={{ multiple: false }}
        sx={{ backgroundColor: "white", width: "100%" }}
        InputLabelProps={{ shrink: true }}
        size="small"
        onChange={(e: any) =>
          setFile((state: any) => {
            return {
              ...state,
              image: e.target.files[0],
              url: URL.createObjectURL(e.target.files[0]),
            };
          })
        }
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
