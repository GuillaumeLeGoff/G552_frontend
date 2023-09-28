import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

function AddEventDialog({ open, onClose, onAdd, name, setName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter un nouvel événement</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="standard-basic"
          label="Nom de l'événement"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          Annuler
        </Button>
        <Button onClick={onAdd} sx={{ color: "secondary.main" }} disabled={!name.trim()}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEventDialog;
