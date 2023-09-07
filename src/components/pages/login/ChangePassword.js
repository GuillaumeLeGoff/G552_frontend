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
import { useTranslation } from "react-i18next"; // Import de useTranslation
import "./login.css";

function ChangePassword() {
  const { t } = useTranslation(); // Utilisation de useTranslation
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError(t("passwordMismatch")); // Utilisation de la traduction
      return;

    }
console.log(user.user);

    AuthService.changePassword(newPassword)
      .then(() => {
        
        
        user.user.firstLogin = 0;
        localStorage.setItem("user", JSON.stringify(user));
        setSuccess(true);
        setError(null);
        AuthService.logout();
      })
      .catch((error) => {
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
              <CloseIcon sx={{ color: "secondary.main" }} />
            </IconButton>
            <Typography variant="h6" color="primary.light" className="title">
              {t("changePassword")} 
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
            <Typography color="success.main" align="center">
              {t("passwordChangeSuccess")} 
            </Typography>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <FormControl className="form-control">
                <TextField
                className="text-field-mdp"
                  label={t("newPassword")} 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  fullWidth
                />
                <TextField
                  className="text-field-mdp"
                  label={t("confirmNewPassword")} 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                />
                {error && (
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                )}
                <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                  {t("changePassword")} {/* Utilisation de la traduction */}
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
