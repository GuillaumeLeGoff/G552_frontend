import AuthService from "../../../services/authService";
import "../../../styles/App.css";
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
import React, { useState } from "react";
import "./login.css";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    console.log(user, password);
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
    try {
      await AuthService.login(user, password);
    } catch (error) {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  }

  return (
    <Grid item xs={10} style={{ maxWidth: "calc(50vh)" }}>
      <Paper>
        <Stack>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}></IconButton>
            <Typography className="title" variant="h6" color="primary.light">
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
        <form className="form" onSubmit={handleSubmit}>
          <FormControl  className="form-control"  >
            <InputLabel>Utilisateur</InputLabel>
            <Select
              label="Mot de passe"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              fullWidth
              margin="normal"
            >
              <MenuItem value="football">Football</MenuItem>
              <MenuItem value="basketball">Basketball</MenuItem>
              <MenuItem value="tennis">Tennis</MenuItem>
            </Select>

            <TextField
              className="text-field-mdp"
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
            <Button type="submit" variant="contained" color="secondary">
              Se connecter
            </Button>
          </FormControl>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
