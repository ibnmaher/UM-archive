import { Snackbar, Alert } from "@mui/material";
import React from "react";

export const Message = ({
  severity,
  message,
  open,
  setOpen,
}: {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%", bottom: "0px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
