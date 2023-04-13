import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetNames } from "../api/getNames";
import { AUTH } from "types";

export const UsersInput = ({
  setValues,
  values,
  errors,
  auth,
  defalutValues,
}: {
  setValues: React.Dispatch<React.SetStateAction<any>>;
  errors: any;
  auth: AUTH;
  values: any;
  defalutValues?: any;
}) => {
  const [name, setName] = React.useState<string>("");
  const { response, error, getNames, loading } = useGetNames(
    { string: name },
    { Authorization: `Bearer ${auth.token}` }
  );

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
        value={values.participants || []}
        isOptionEqualToValue={(option: any, value: any) =>
          option.id === value.id
        }
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
            error={errors.participants.error}
            helperText={errors.participants.message}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        )}
      />
    </>
  );
};
