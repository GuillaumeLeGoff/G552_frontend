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
        <Button onClick={onAdd} color="secondary" disabled={!name.trim()}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEventDialog;
