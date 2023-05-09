import React, { createContext, useState } from "react";
import { Box, Grid, ThemeProvider } from "@mui/material";
import LoadingScreen from "./components/LoadingScreen";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Create from "./components/pages/create/CreatePage";
import Login from "./components/pages/login/LoginPage";
import Signup from "./components/pages/login/Signup";
import Macro from "./components/pages/macro/Macro";
import Profile from "./components/pages/profile/Profile";
import Navbar from "./components/NavBar";


import { LoadingContext } from './contexts/Context';

import authService from "./services/authService";
import "./styles/App.css";
import { darkTheme } from "./themes/darkTheme.ts";

import { useDarkMode } from "./contexts/DarkModeContext";

import { clairTheme } from "./themes/clairTheme.ts";

function App() {
  const [token] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();
  const value = 'My Context Value';

  /* useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Ici, 3000 millisecondes (3 secondes) est le temps d'affichage de la page de chargement.
    console.log(darkMode);
    return () => clearTimeout(timer);
  }, []); */

  const theme = darkMode ? darkTheme : clairTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <LoadingContext.Provider value={setLoading}>
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
          <Box className="Container">
            {token ? (
              <Grid container spacing={2}>
                <Routes>
                  <Route path="*" element={<Navigate to="/create" />} />
                  <Route path="create" element={<Create />} />
                  <Route path="create/:id" element={<Create />} />
                  <Route path="macro" element={<Macro />} />
                  <Route path="profile" element={<Profile />} />
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
                  <Route path="*" element={<Navigate to="/login" />} />
                  <Route path="login" element={<Login />} />
                </Routes>
              </Grid>
            )}
          </Box>
          <Box>
            <Navbar />
          </Box>
        </LoadingContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
