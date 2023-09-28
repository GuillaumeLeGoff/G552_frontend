import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";


function UserConnectedDialog({ open, onClose, userDisconet }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Utilisateur deja connecter</DialogTitle>
      <DialogContent>
        <DialogContentText>Voulez-vous le déconnecter ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          Non
        </Button>
        <Button onClick={userDisconet} sx={{ color: "secondary.main" }}>
          Oui
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserConnectedDialog;
