import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function AddEventDialog({ open, onClose, onAdd, name, setName }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("addNewEvent")}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="standard-basic"
          label={t("eventName")}
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t("cancel")}
        </Button>
        <Button onClick={onAdd} sx={{ color: "secondary.main" }} disabled={!name.trim()}>
          {t("add")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEventDialog;
