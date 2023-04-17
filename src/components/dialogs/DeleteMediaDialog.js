import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";


function DeleteMediaDialog({ open, onClose, DeleteFile, displayDialogDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <DialogContentText>Voulez-vous supprimer ce media?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={displayDialogDelete} color="secondary">
          Annuler
        </Button>
        <Button onClick={DeleteFile} color="secondary">
          Confirme
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteMediaDialog;
