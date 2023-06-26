import React, { useState } from "react";
import { Box, Grid, ThemeProvider } from "@mui/material";
import LoadingScreen from "./components/LoadingScreen";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Create from "./components/pages/create/CreatePage";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n/i18n";
import Login from "./components/pages/login/LoginPage";
import Macro from "./components/pages/macro/Macro";
import Profile from "./components/pages/profile/Profile";
import Navbar from "./components/NavBar";

import { LoadingContext } from "./contexts/Context";

import AuthService from "./services/authService";
import "./styles/App.css";
import { darkTheme } from "./themes/darkTheme.ts";

import { useDarkMode } from "./contexts/DarkModeContext";

import { clairTheme } from "./themes/clairTheme.ts";
import ChangePassword from "./components/pages/login/ChangePassword";
import ScoreboardPage from "./components/pages/scoreboard/ScoreboardPage";
import Header from "./components/Header";

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
            <Header />
            <Box className="Container">
              {token && token.user.firstLogin === 1 ? (
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ minHeight: "calc(94vh - 56px)" }}
                  spacing={2}
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
                <Grid container spacing={2}>
                  <Routes>
                    {/* Autres routes */}
                    <Route path="*" element={<Navigate to="/create" />} />
                    <Route path="create" element={<Create />} />
                    <Route path="create/:id" element={<Create />} />
                    <Route path="macro" element={<Macro />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="scoreboard" element={<ScoreboardPage />} />
                  </Routes>
                </Grid>
              ) : (
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{ minHeight: "calc(94vh - 56px)" }}
                  spacing={2}
                >
                  <Routes>
                    {/* Autres routes */}
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="login" element={<Login />} />
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
