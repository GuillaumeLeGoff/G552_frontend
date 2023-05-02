import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../../contexts/DarkModeContext";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  Typography,
  Slider,
  LinearProgress,
  TextField,
} from "@mui/material";
import "../../../styles/Global.css";
import SettingsIcon from "@mui/icons-material/Settings";

import authService from "../../../services/authService";
import userService from "../../../services/userService";
import "./Profile.css";
import paramService from "../../../services/paramService";
import veilleService from "../../../services/veilleService";
function Profile() {
  const [username, setUsername] = useState("John Doe");
  const [password, setPassword] = useState("");
  const [param, setParam] = useState("");
  const [veille, setVeille] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const totalSize = 100; // Taille totale en Go
  const usedSize = 90; // Taille utilisée en Go

  const percentage = (usedSize / totalSize) * 100;

  const user = authService.getCurrentUser();

  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    setUsername(user.user.username);
    paramService.getByUserId(user.user.id).then((param) => {
      setParam(param.data[0]);
      console.log("param", param.data[0]);
      // Mettre à jour l'état avec les données de param
      veilleService.getByUserId(param.data[0].veille_id).then((veille) => {
        setVeille(veille.data);
        console.log("veille", veille.data);
        // Mettre à jour l'état avec les données de veille
      });
    });
  }, [user.user.username, user.user.id]);

  function setIsDarkMode() {
    console.log(darkMode);
    setDarkMode((prevDarkMode) => {
      localStorage.setItem("darkMode", !prevDarkMode);
      return !prevDarkMode;
    });
  }

  const handleEventAutoChange = (event) => {
    setParam({ ...param, event_auto: event.target.checked ? 1 : 0 });
    paramService.update({ ...param, event_auto: event.target.checked ? 1 : 0 }).then((response) => {
      console.log("Paramètres mis à jour :", response.data);
    });
  };

  const handleVeilleChange = (event) => {
    setVeille({ ...veille, enable: event.target.checked ? 1 : 0 });

    veilleService.update({ ...veille, enable: event.target.checked ? 1 : 0 }).then((response) => {
      console.log("Paramètres mis à jour :", response.data);
    });
  };

  const handleSliderChange = (event, newValue) => {
    setVeille({ ...veille, start_time: newValue[0], end_time: newValue[1] });
    veilleService.update({ ...veille, start_time: newValue[0], end_time: newValue[1] }).then((response) => {
      console.log("Paramètres mis à jour :", response.data);
    });
  };

  return (
    <Grid item xs={12}>
      <Paper className="mainPaper">
        <Stack className="headerSection">
          <div className="headerItemLeft">
            <IconButton>
              <SettingsIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Paramètre de {username}
            </Typography>
          </div>
          {/* <div className="headerItemRight">
            <IconButton>
              <SaveIcon onClick={handlePasswordChange} color="secondary" />
            </IconButton>
          </div> */}
        </Stack>
        <Box className="profileContainer">
          <Stack spacing={2}>
            {/* <Typography variant="h6" component="h2">
              Nom {username}
            </Typography> */}
            <Stack direction="column" spacing={1}>
              <Typography>Change Password:</Typography>
              <Box className="passwordContainer">
                <TextField
                  className="passwordInput"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  label="Current Password"
                />
                <TextField
                  className="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="New Password"
                />
              </Box>
            </Stack>
            <Stack className="switchContainer">
              <Typography>Mode sombre</Typography>
              <Switch
                checked={darkMode}
                onChange={() => setIsDarkMode()}
                color="secondary"
              />
            </Stack>
            <Stack className="switchContainer">
              <Typography>Event auto</Typography>
              <Switch
                color="secondary"
                checked={param.event_auto === 1}
                onChange={handleEventAutoChange}
              />
            </Stack>
            <Stack className="switchContainer">
              <Typography>Mise en veille automatique</Typography>
              <Switch
                color="secondary"
                checked={veille.enable === 1}
                onChange={handleVeilleChange}
              />
            </Stack>
            <Stack className="switchContainer">
              <Slider
                color="secondary"
                value={[veille.start_time, veille.end_time]}
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
                onChange={handleSliderChange}
                disabled={veille.enable === 0}
              />
            </Stack>
            <Stack className="switchContainer">
              <Typography>Espace de stockage utilisé</Typography>
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
