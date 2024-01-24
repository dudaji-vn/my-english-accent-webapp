import { Alert, Snackbar } from "@mui/material";
import { useState, FC } from "react";

interface SnackbarHook {
  showSnackbar: (message: string, severity?: "error" | "warning" | "info" | "success") => void;
  SnackbarComponent: FC;
}

const useSnackbar = (): SnackbarHook => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"error" | "warning" | "info" | "success">("info");

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const showSnackbar = (message: string, severity: "error" | "warning" | "info" | "success" = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const SnackbarComponent: FC = () => (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      onClose={() => handleSnackbarClose()}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );

  return {
    showSnackbar,
    SnackbarComponent,
  };
};
export default useSnackbar;
