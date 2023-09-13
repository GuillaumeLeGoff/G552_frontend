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
} from "@mui/material";

import PermMediaIcon from "@mui/icons-material/PermMedia";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LockIcon from "@mui/icons-material/Lock";
import StorageIcon from "@mui/icons-material/Storage";
import BugReportIcon from "@mui/icons-material/BugReport";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import ModeNightIcon from "@mui/icons-material/ModeNight";

import ChangePasswordDialog from "../../dialogs/ChangePasswordDialog";
import authService from "../../../services/authService";
import paramService from "../../../services/paramService";
import veilleService from "../../../services/veilleService";
import LanguageSelector from "../../LanguageSelector";
import "./Profile.css";

function Profile() {
  const [username, setUsername] = useState("John Doe");
  const [modalOpen, setModalOpen] = useState(false);
  const [param, setParam] = useState({});
  const [veille, setVeille] = useState({});
  const totalSize = 100; // Taille totale en Go
  const usedSize = 90; // Taille utilisée en Go
  const [user, setUser] = useState(null);
  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.user.username);
      paramService.getByUserId(user.user.id).then((paramData) => {
        const paramDataItem = paramData?.data?.[0] || {};
        setParam(paramDataItem);

        // Mettre à jour l'état avec les données de param
        veilleService
          .getByUserId(paramDataItem.veille_id)
          .then((veilleData) => {
            setVeille(veilleData?.data || {});

            // Mettre à jour l'état avec les données de veille
          });
      });
    }
  }, [user]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const setIsDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      localStorage.setItem("darkMode", !prevDarkMode);
      return !prevDarkMode;
    });
  };

  const handleEventAutoChange = (event) => {
    const updatedParam = { ...param, event_auto: event.target.checked ? 1 : 0 };
    setParam(updatedParam);
    paramService.update(updatedParam).then((response) => {});
  };

  const handleVeilleChange = (event) => {
    const updatedVeille = { ...veille, enable: event.target.checked ? 1 : 0 };
    setVeille(updatedVeille);
    veilleService.update(updatedVeille).then((response) => {});
  };

  const handleSliderChange = (event, newValue) => {
    const updatedVeille = {
      ...veille,
      start_time: newValue[0],
      end_time: newValue[1],
    };
    setVeille(updatedVeille);
    veilleService.update(updatedVeille).then((response) => {});
  };

  const percentage = (usedSize / totalSize) * 100;

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <SettingsIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                Paramètres de {username}
              </Typography>
            </Box>
          </Stack>
          <Box
            className="containerPage"
            sx={{ paddingLeft: 6, paddingRight: 6 }}
          >
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    Application
                  </Typography>
                  <Stack
                    onClick={toggleModal}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <IconButton disabled>
                      <LockIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography
                      variant="h8"
                      sx={{
                        color: "text.primary",
                        textTransform: "none",
                        padding: "0",
                      }}
                    >
                      Modifier son mot de passe
                    </Typography>
                  </Stack>
                  <Stack
                    onClick={setIsDarkMode}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <DarkModeIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        Mode sombre
                      </Typography>
                    </Stack>
                    <Switch checked={darkMode} color="secondary" />
                  </Stack>
                  <Stack
                    onClick={toggleModal}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <IconButton disabled>
                      <StorageIcon sx={{ color: "text.secondary" }} />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        Espace de stockage utilisé
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        color={percentage > 80 ? "error" : "secondary"}
                      />
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <IconButton disabled>
                      <BugReportIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography variant="h8" sx={{ color: "text.primary" }}>
                      Test Panneaux
                    </Typography>
                  </Stack>

                  <Stack
                    justifyContent="space-between"
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <LanguageIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        Langues
                      </Typography>
                    </Stack>
                    <LanguageSelector />
                  </Stack>
                </Stack>
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, color: "text.secondary" }}
                  >
                    Info
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <IconButton disabled>
                      <PhoneIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography variant="h8" sx={{ color: "text.primary" }}>
                      0123456789
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    Compte
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                    onClick={handleEventAutoChange}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <PermMediaIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography>Event auto</Typography>
                    </Stack>
                    <Switch
                      color="secondary"
                      checked={param.event_auto === 1}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                    onClick={handleVeilleChange}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <ModeNightIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography>Mise en veille automatique</Typography>
                    </Stack>
                    <Switch
                      color="secondary"
                      checked={veille.enable === 1}
                      onChange={handleVeilleChange}
                    />
                  </Stack>
                  <Stack>
                    <Slider
                      m={5}
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
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <ChangePasswordDialog open={modalOpen} onClose={toggleModal} />
    </>
  );
}

export default Profile;
