import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AuthService from "../../../services/authService";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Appeler le service d'authentification pour changer le mot de passe
    AuthService.changePassword(newPassword)
    .then(() => {
      // Met à jour la valeur 'firstLogin' dans le localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      user.user.firstLogin = 0;
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      setSuccess(true);
      setError(null);
      AuthService.logout();
    })
    .catch((error) => {
      console.log("Erreur", error.response.data.message);
      setError(error.response.data.message);
    });
  }
  function disconnect() {
    AuthService.logout();
    window.location.reload();
  }

  return (
    <Grid item xs={10} style={{ maxWidth: "calc(50vh)" }}>
      <Paper>
        <Stack>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={disconnect} sx={{ ml: 2 }}>
              <CloseIcon color="secondary" />
            </IconButton>
            <Typography variant="h6" color="primary.light" className="title">
              Modifier le mot de passe
            </Typography>
          </div>
        </Stack>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingX={5}
          pb={5}
        >
          {success ? (
            <Typography variant="body1" color="success.main" align="center">
              Le mot de passe a été modifié avec succès.
            </Typography>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <FormControl className="form-control">
                <TextField
                  label="Nouveau mot de passe"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="text-field-mdp"
                  label="Confirmer le nouveau mot de passe"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                />
                {error && (
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                )}
                <Button type="submit" variant="contained" color="secondary">
                  Modifier le mot de passe
                </Button>
              </FormControl>
            </form>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

export default ChangePassword;
