import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/system';

function AddEventDialog({ open, onClose, onAdd, name, setName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">Nouvel événement</Typography>
        <IconButton
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          id="standard-basic"
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2}>
          <Button disableElevation sx={{ color: 'white' }} onClick={onAdd}>
            Ajouter
          </Button>
          <Button sx={{ color: 'white' }} disableElevation onClick={onClose}>
            Annuler
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default AddEventDialog;
