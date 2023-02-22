import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetNames } from "../api/getNames";

export const UsersInput = ({
  setValues,
}: {
  setValues: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [name, setName] = React.useState<string>("");
  const { response, error, getNames, loading } = useGetNames({ string: name });

  React.useEffect(() => {
    getNames();
  }, [name]);

  return (
    <>
      <Autocomplete
        size="small"
        multiple
        limitTags={2}
        onChange={(e, value) =>
          setValues((state: any) => {
            return { ...state, participants: value };
          })
        }
        id="multiple-limit-tags"
        options={response || []}
        getOptionLabel={(option: { name: string; email: string; id: number }) =>
          `${option.name} (${option.email})`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ backgroundColor: "white", width: "100%" }}
            label="اسماء المشاركين"
            placeholder="الاسماء"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        )}
      />
    </>
  );
};
