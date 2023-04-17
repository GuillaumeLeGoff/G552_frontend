import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  Slider,
  LinearProgress,
} from "@mui/material";
import "../../../styles/Global.css";
import SaveIcon from "@mui/icons-material/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import authService from "../../../services/authService";
import userService from "../../../services/userService";
function Profile() {
  const [username, setUsername] = useState("John Doe");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [miseEnVeille, setMiseEnVeille] = useState(false);
  const [sleepStart, setSleepStart] = useState(22);
  const [sleepEnd, setSleepEnd] = useState(7);
  const totalSize = 100; // Taille totale en Go
  const usedSize = 90; // Taille utilisée en Go

  const percentage = (usedSize / totalSize) * 100;

  const user = authService.getCurrentUser();

  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    setUsername(user.user.username);
  }, [user.user.username]);

  function setIsDarkMode() {
    console.log(darkMode);
    setDarkMode((prevDarkMode) => {
      localStorage.setItem("darkMode", !prevDarkMode);
      return !prevDarkMode;
    });
  }

  const handlePasswordChange = () => {
    userService
      .changePassword(oldPassword, password, user.id)
      .then((result) => {});
  };

  return (
    <Grid item xs={12}>
      <Paper className="mainPaper">
        <Stack className="headerSection">
          <div className="headerItemLeft">
            <IconButton>
              <AccountBoxIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Profile {username}
            </Typography>
          </div>
          {/* <div className="headerItemRight">
            <IconButton>
              <SaveIcon onClick={handlePasswordChange} color="secondary" />
            </IconButton>
          </div> */}
        </Stack>
        <Box className="container">
          <Stack spacing={2} sx={{ mt: 4 }}>
            <Typography variant="h6" component="h2">
              Nom: {username}
            </Typography>
            {/* <Stack direction="column" spacing={1}>
              <Typography>Change Password:</Typography>
              <TextField
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                label="Current Password"
              />
              <TextField
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="New Password"
              />
            </Stack> */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography >Mode sombre</Typography>
              <Switch
                checked={darkMode}
                onChange={() => setIsDarkMode()}
                color="secondary"
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography >Event auto</Typography>
              <Switch color="secondary" />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography >Mise en veille automatique</Typography>
              <Switch
                color="secondary"
                checked={miseEnVeille}
                onChange={() => setMiseEnVeille(!miseEnVeille)}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Slider
                color="secondary"
                value={[sleepStart, sleepEnd]}
                onChange={(event, newValue) => {
                  setSleepStart(newValue[0]);
                  setSleepEnd(newValue[1]);
                }}
                min={0}
                max={24}
                step={1}
                marks={[
                  { value: 0, label: "0h" },
                  { value: 6, label: "6h" },
                  { value: 12, label: "12h" },
                  { value: 18, label: "18h" },
                  { value: 24, label: "24h" },
                ]}
                valueLabelDisplay="auto"
                disabled={!miseEnVeille}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography >Espace de stockage utilisé</Typography>

              
            </Stack>
            <LinearProgress
                variant="determinate"
                value={percentage}
                color={percentage > 80 ? "error" : "secondary"}
              />
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Profile;
