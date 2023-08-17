import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";


function UserConectedDialog({ open, onClose, userDisconet }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Utilisateur deja connecter</DialogTitle>
      <DialogContent>
        <DialogContentText>Voulez-vous le déconnecter ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Non
        </Button>
        <Button onClick={userDisconet} color="secondary">
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserConectedDialog;
