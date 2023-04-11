import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";

function AddEventDialog({ open, onClose, onAdd, name, setName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter un nouvel événement</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          id="standard-basic"
          label="Nom de l'événement"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={onAdd} color="secondary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEventDialog;
