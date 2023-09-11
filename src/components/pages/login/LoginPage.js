import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import LoginIcon from "@mui/icons-material/Login";

import AuthService from "../../../services/authService";
import UserConectedDialog from "../../dialogs/UserConectedDialog";
import ActiveSessionsService from "../../../services/activeSessionsService";

import "./login.css";
import "../../../styles/App.css";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userConectedDialog, setUserConectedDialog] = useState(false);
  const { t } = useTranslation();

  function deleteUserConected() {
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
      setError(t("loginErrorMessage"));
    }
  }

  return (
    <Grid item>
      <Paper>
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton>
              <LoginIcon
                sx={{ color: "primary.light" }}
                className="headerButton"
              />
            </IconButton>
            <Typography
              className="headerTitle"
              variant="h6"
              sx={{ color: "primary.light" }}
            >
              {t("loginTitle")}
            </Typography>
          </Box>
        </Stack>

        <Box className="centeredContainer">
          <FormControl>
            <InputLabel>{t("usernameLabel")}</InputLabel>
            <Select
              label={t("passwordLabel")}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              margin="normal"
            >
              <MenuItem value="football">{t("football")}</MenuItem>
              <MenuItem value="basketball">{t("basketball")}</MenuItem>
              <MenuItem value="tennis">{t("tennis")}</MenuItem>
            </Select>
            <TextField
              label={t("passwordLabel")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <Typography variant="body2" color="error" align="center">
              {error || " "}
            </Typography>
            <Button
              type="submit"
              sx={{ color: "secondary.main" }}
              onClick={handleSubmit}
            >
              {t("loginButton")}
            </Button>
          </FormControl>
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
