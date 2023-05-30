import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from '@mui/material';

function TimerPickerDialog({ open, onClose, setTimer, eventName }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleMinutesChange = (event) => {
    const inputMinutes = parseInt(event.target.value, 10);
    setMinutes(inputMinutes);
  };

  const handleSecondsChange = (event) => {
    const inputSeconds = parseInt(event.target.value, 10);
    setSeconds(inputSeconds);
  };

  const handleConfirm = () => {
    console.log(`Timer set to ${minutes} minutes and ${seconds} seconds`);
    const timeInSeconds = minutes * 60 + seconds;
    setTimer(timeInSeconds);
    setMinutes(0);
    setSeconds(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choisir le temps</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez choisir les minutes et les secondes :
        </DialogContentText>
        <FormControl>
          <InputLabel>Minutes</InputLabel>
          <Select value={minutes} onChange={handleMinutesChange}>
            {Array.from({ length: 60 }, (_, index) => (
              <MenuItem key={index} value={index}>{index}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Secondes</InputLabel>
          <Select value={seconds} onChange={handleSecondsChange}>
            {Array.from({ length: 60 }, (_, index) => (
              <MenuItem key={index} value={index}>{index}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Annuler
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TimerPickerDialog;
