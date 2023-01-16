import "../../../styles/App.css";
import AuthService from "../../../services/authService";


import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  
  async function handleSubmit() {
    
      const data =  AuthService.login(user, password);
      console.log(data);
      if (data.status === "success") {
        console.log('salut');
        localStorage.setItem("token", data.token);
      } else {
        setError(data.message);
      }
   
  }

  return (
    <Container className="center" maxWidth="sm" component="main">
      <Paper
        elevation={3}
        sx={{ display: "flex", borderRadius: 2, backgroundColor: "#203038" }}
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
      </Paper>
    </Container>
  );
}

export default Login;
