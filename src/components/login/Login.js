import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Select,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import "./display.css";
import UserConnectedDialog from "../dialogs/UserConnectedDialog";
import ActiveSessionsService from "../../services/activeSessionsService";
import authService from "../../services/authService";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [openUserConnectedDialog, setOpenUserConnectedDialog] = useState(false);
  const { t } = useTranslation();

  function deleteUserConected() {
    ActiveSessionsService.deleteCurrentUser();
    handleSubmit();
    closeUserConnectedDialog();
  }

  function UserConnectedDialogOpen() {
    setOpenUserConnectedDialog(true);
  }

  function closeUserConnectedDialog() {
    setOpenUserConnectedDialog(false);
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    try {
      await authService.login(user, password).then((response) => {
        if (response.userConected && response.userConected === true) {
          UserConnectedDialogOpen();
        }
      });
    } catch (error) {
      setError(t("loginErrorMessage"));
    }
  }

  return (
    <div class="scoreboard">
      <div class="team home">
        <span class="team-score">999</span>
        <span class="team-name">Domicile</span>

        <div className="timeout ">
          <CircleIcon className="circleIcon" />

          <CircleIcon className="circleIcon" />

          <CircleIcon className="circleIcon" />
        </div>
        <div class="timer-timeout">00:00</div>
      </div>

      <div class="middle-section">
        <div class="period">
          <ArrowLeftIcon />
          <span class="period-number">1</span>
          <ArrowRightIcon />
        </div>
        <div class="timer">00:00</div>
      </div>

      <div class="team guest">
        <span class="team-score">999</span>
        <span class="team-name">Invité</span>

        <div className="timeout ">
          <CircleIcon className="circleIcon" />

          <CircleIcon className="circleIcon" />

          <CircleIcon className="circleIcon" />
        </div>
        <div class="timer-timeout">00:00</div>
      </div>
    </div>
    /*  <Grid item>
      <Paper>
        <Box className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled>
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
        </Box>

        <Box className="centeredContainer">
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: "35vh" }}>
              <InputLabel>{t("usernameLabel")}</InputLabel>
              <Select
                label={t("passwordLabel")}
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              >
                <MenuItem value="handball">{t("handball")}</MenuItem>
                <MenuItem value="volleyball">{t("volleyball")}</MenuItem>
                <MenuItem value="futsal">{t("futsal")}</MenuItem>
                <MenuItem value="badminton">{t("badminton")}</MenuItem>
                <MenuItem value="basketball">{t("basketball")}</MenuItem>
                <MenuItem value="tennis">{t("tennis")}</MenuItem>
              </Select>
              <TextField
                label={t("passwordLabel")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
              />
              <Typography
                variant="body2"
                sx={{
                  color: error ? "error.main" : "transparent",
                  textAlign: "center",
                  height: "1.5em",
                }}
              >
                {error || " "}
              </Typography>
              <Button type="submit" sx={{ color: "secondary.main" }}>
                {t("loginButton")}
              </Button>
            </FormControl>
          </form>
        </Box>
      </Paper>
      <UserConnectedDialog
        open={openUserConnectedDialog}
        onClose={closeUserConnectedDialog}
        userDisconet={deleteUserConected}
      />
    </Grid> */
  );
}

export default Login;
