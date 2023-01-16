import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit() {}

  return (
    <Container className="center" maxWidth="sm" component="main">
      <Paper
        elevation={3}
        sx={{ display: "flex", borderRadius: 2, backgroundColor: "#203038" }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            label="Confirmer le mot de passe"
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
            S'inscrire
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
