import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTranslation } from "react-i18next"; // Importez useTranslation depuis react-i18next
import "./login.css";
import AuthService from "../../../services/authService";
import "../../../styles/App.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation(); // Utilisez useTranslation pour accéder aux traductions

  async function handleSubmit(e) {
    console.log(user, password);
    e.preventDefault();
    try {
      await AuthService.login(user, password);
    } catch (error) {
      setError(t("loginErrorMessage")); // Utilisez la traduction pour le message d'erreur
    }
  }

  return (
    <Grid item xs={10} style={{ maxWidth: "calc(50vh)" }}>
      <Paper>
        <Stack>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}></IconButton>
            <Typography className="title" variant="h6" color="primary.light">
              {t("loginTitle")} {/* Utilisez la traduction pour le titre */}
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
          <form className="form" onSubmit={handleSubmit}>
            <FormControl className="form-control">
              <InputLabel>{t("usernameLabel")}</InputLabel>
              <Select
                label={t("passwordLabel")} 
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                fullWidth
                margin="normal"
              >
                <MenuItem value="football">{t("football")}</MenuItem>
                <MenuItem value="basketball">{t("basketball")}</MenuItem>
                <MenuItem value="tennis">{t("tennis")}</MenuItem>
              </Select>

              <TextField
                className="text-field-mdp"
                label={t("passwordLabel")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {t("loginButton")} 
              </Button>
            </FormControl>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
