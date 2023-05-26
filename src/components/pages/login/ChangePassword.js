import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
        setSuccess(true);
        setError(null);
      })
      .catch((error) => {
        setError("Erreur lors du changement de mot de passe");
      });
  }

  return (
    <Grid item xs={10} style={{ maxWidth: "calc(50vh)" }}>
      <Paper>
        <Stack>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" color="primary.light" sx={{ padding: 2 }}>
              Modifier le mot de passe
            </Typography>
          </div>
        </Stack>
        <Box display="flex" justifyContent="center" alignItems="center" paddingX={5} pb={5}>
          {success ? (
            <Typography variant="body1" color="success.main" align="center">
              Le mot de passe a été modifié avec succès.
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
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
              <Button type="submit" variant="contained" color="primary">
                Modifier le mot de passe
              </Button>
            </form>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

export default ChangePassword;