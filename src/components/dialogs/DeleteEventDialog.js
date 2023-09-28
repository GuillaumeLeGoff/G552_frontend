import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

function DeleteEventDialog({ open, onClose, onDelete, eventName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Êtes-vous sûr de vouloir supprimer l'événement "{eventName}" ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          Annuler
        </Button>
        <Button onClick={onDelete} sx={{ color: "secondary.main" }}>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteEventDialog;
