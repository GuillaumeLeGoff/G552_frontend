import React from "react";
import { AlertContext } from "./AlertContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertSnackbar() {
  const { alert, hideAlert } = AlertContext.useAlert();

  return (
    <Snackbar
      open={!!alert.message}
      autoHideDuration={5000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={hideAlert} severity={alert.severity}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
