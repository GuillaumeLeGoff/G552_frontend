import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  DialogContentText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";

function DeleteMediaDialog({ open, onClose, DeleteFile, displayDialogDelete }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <DialogContentText>Voulez-vous supprimer ce media?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={DeleteFile} color="secondary">
          Annuler
        </Button>
        <Button onClick={displayDialogDelete} color="secondary">
          Confirme
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteMediaDialog;
