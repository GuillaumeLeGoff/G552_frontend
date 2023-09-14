import React, { useEffect, useState } from "react";
import { Box, Grid, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n/i18n";

import { darkTheme } from "./themes/darkTheme.ts";
import { clairTheme } from "./themes/clairTheme.ts";
import { useDarkMode } from "./contexts/DarkModeContext";
import { LoadingContext } from "./contexts/Context";

import AuthService from "./services/authService";
import ChangePassword from "./components/login/ChangePassword";
import Header from "./components/common/Header";
import Scoreboard from "./components/scoreboard/Scoreboard";
import Login from "./components/login/Login";
import Macro from "./components/macro/Macro";
import Profile from "./components/profile/Profile";
import Navbar from "./components/common/NavBar";
import LoadingScreen from "./components/common/LoadingScreen";
import MediaAndDiaporamaManager from "./components/common/MediaAndDiaporamaManager";

import { switchToDarkTheme } from "./themes/darkTheme.ts";
import { switchToClairTheme } from "./themes/clairTheme.ts";
import "./styles/Global.css";


function App() {
  const [token] = useState(AuthService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { darkMode } = useDarkMode();
  const loadingState = {
    loading: loading,
    progress: progress,
    setLoading: setLoading,
    setProgress: setProgress,
  };
  useEffect(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    if (darkMode) {
      switchToDarkTheme();
    } else {
      switchToClairTheme();
    }
  }, [darkMode]);
  const theme = darkMode ? darkTheme : clairTheme;

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <CssBaseline />

        <BrowserRouter>
          <LoadingContext.Provider value={loadingState}>
            {loading && (
              <Box
                style={{
                  position: "fixed",
                  bottom: "0",
                  width: "100%",
                  zIndex: "9999",
                }}
              >
                <LoadingScreen />
              </Box>
            )}
            <Header darkMode={darkMode}/>
            <Box className="mainContainer">
              {token && token.user.firstLogin === 1 ? (
                <Grid
                  container
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(94vh -  120px )",
                    spacing: 2,
                  }}
                >
                  <Routes>
                    <Route
                      path="*"
                      element={<Navigate to="/ChangePassword" />}
                    />
                    <Route path="ChangePassword" element={<ChangePassword />} />
                  </Routes>
                </Grid>
              ) : token ? (
                <Routes>
                  <Route path="*" element={<Navigate to="/create" />} />
                  <Route path="create" element={<MediaAndDiaporamaManager />} />
                  <Route path="create/:id" element={<MediaAndDiaporamaManager />} />
                  <Route path="scoreboard" element={<Scoreboard />} />
                  <Route path="macro" element={<Macro />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              ) : (
                <Grid
                  container
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(94vh -  120px )",
                    spacing: 2,
                  }}
                >
                  <Routes>
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="login" element={<Login />} />
                    {/*   <Route path="login" element={<TennisScoreboard />} /> */}
                  </Routes>
                </Grid>
              )}
            </Box>
            {token && token.user.firstLogin !== 1 ? (
              <Box>
                <Navbar />
              </Box>
            ) : null}
          </LoadingContext.Provider>
        </BrowserRouter>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
