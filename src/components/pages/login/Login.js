import AuthService from "../../../services/authService";
import "../../../styles/App.css";

import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  async function handleSubmit(e) {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
    try {
      await AuthService.login(user, password);
    } catch (error) {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  }

  return (
    <Grid item xs={10} style={{ maxWidth: "calc(70vh)" }}>
      <Paper>
        <Stack>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}></IconButton>
            <Typography variant="h6" color="white" sx={{ padding: 2 }}>
              Login
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
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom d'utilisateur"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mot de passe"
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
            <Button type="submit" variant="contained" color="primary">
              Se connecter
            </Button>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
