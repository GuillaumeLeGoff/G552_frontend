import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@mui/material";
import authService from "../../services/authService";
import { useSnackbar } from "../../contexts/SnackbarContext";

function ChangePasswordDialog({ open, onClose }) {
  const { openSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Appeler le service d'authentification pour changer le mot de passe
    authService
      .changePassword(newPassword)
      .then(() => {
        setError("");
        onClose();
        openSnackbar("Mot de passe modifié avec succès", "success");
      })
      .catch((error) => {
        console.log("Erreur", error.response.data.message);
        setError(error.response.data.message);
      });
  }

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Modifier mot de passe</DialogTitle>
      <DialogContent>
        <FormControl className="form-control">
          <TextField
            label="Nouveau mot de passe"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            
          />
          <TextField
            label="Confirme le nouveaux mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
           
          />
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="secondary"
        >
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePasswordDialog;
