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
import UserConectedDialog from "../../dialogs/UserConectedDialog";
import ActiveSessionsService from "../../../services/activeSessionsService";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userConectedDialog, setUserConectedDialog] = useState(false);
  const { t } = useTranslation(); // Utilisez useTranslation pour accéder aux traductions

  function deleteUserConected() {
    console.log("deleteUserConected");
    ActiveSessionsService.deleteCurrentUser();
    closeuserConectedDialog();
  }


  function userConectedDialogOpen() {
    setUserConectedDialog(true);

  }

  function closeuserConectedDialog() {
    setUserConectedDialog(false);
   
  }

  async function handleSubmit(e) {
    console.log(user, password);
    e.preventDefault();
    try {
      await AuthService.login(user, password).then((response) => {
       
        if (response.userConected && response.userConected === true) {
          userConectedDialogOpen();
        }
      });
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
              <Button type="submit" variant="contained" sx={{ color: "secondary.main" }}>
                {t("loginButton")} 
              </Button>
            </FormControl>
          </form>
        </Box>
      </Paper>
      <UserConectedDialog
        open={userConectedDialog}
        onClose={closeuserConectedDialog}
        userDisconet={deleteUserConected}
      />
    </Grid>
  );
}

export default Login;
