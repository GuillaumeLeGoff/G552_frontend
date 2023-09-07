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
  Button,
  Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangePasswordDialog from "../../dialogs/ChangePasswordDialog";
import authService from "../../../services/authService";
import "./Profile.css";
import paramService from "../../../services/paramService";
import veilleService from "../../../services/veilleService";
import LanguageSelector from "../../LanguageSelector";

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
            <div className="headerLeft">
              <IconButton>
                <SettingsIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography variant="h6" className="headerTitlePadding">
                Paramètres de {username}
              </Typography>
            </div>
          </Stack>
          <Box className="profileContainer">
            <Grid direction="row" justifyContent="center" container>
              <Grid item xs={12} md={5}>
                <Typography className="titleParam" variant="h6">Paramètres du compte</Typography>
                <Stack spacing={2}>
                  <Stack direction="column" spacing={1}>
                    <Button
                      onClick={toggleModal}
                      variant="contained"
                      sx={{ color: "secondary.main" }}
                    >
                      Modifier son mot de passe
                    </Button>
                  </Stack>
                  <Stack className="switchContainer">
                    <Typography>Mode sombre</Typography>
                    <Switch
                      checked={darkMode}
                      onChange={setIsDarkMode}
                      sx={{ color: "secondary.main" }}
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
                  <Button variant="contained" sx={{ color: "secondary.main" }}>
                    test
                  </Button>
                  <LanguageSelector />
                  <Typography> Numéro de Stramatel : 0123456789</Typography>
                </Stack>
              </Grid>
              <Divider
                className="divider"
                orientation="vertical"
                flexItem
                md={2}
              />
              <Grid item xs={12} md={5}>
                <Typography  className="titleParam" variant="h6">Paramètres principaux</Typography>
                <Stack spacing={2}>
                  <Stack className="switchContainer">
                    <Typography>Event auto</Typography>
                    <Switch
                      sx={{ color: "secondary.main" }}
                      checked={param.event_auto === 1}
                      onChange={handleEventAutoChange}
                    />
                  </Stack>
                  <Stack className="switchContainer">
                    <Typography>Mise en veille automatique</Typography>
                    <Switch
                      sx={{ color: "secondary.main" }}
                      checked={veille.enable === 1}
                      onChange={handleVeilleChange}
                    />
                  </Stack>
                  <Stack className="switchContainer">
                    <Slider
                      sx={{ color: "secondary.main" }}
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
