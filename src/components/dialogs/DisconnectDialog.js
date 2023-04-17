import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function DisconnectDialog({ open, onClose, logout }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Voulez-vous vraiment vous déconnecter ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={logout} color="secondary">
          Déconnexion
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DisconnectDialog;
