import { Grid, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Create from "./components/dashboard/create/Create";
import Login from "./components/dashboard/login/Login";
import Signup from "./components/dashboard/login/Signup";
import Macro from "./components/dashboard/macro/Macro";
import Profile from "./components/dashboard/profile/Profile";
import Navbar from "./components/NavBar";
import authService from "./services/authService";
import "./styles/App.css";
import { appTheme } from "./themes/theme.ts";

function App() {
  const [token] = useState(authService.getCurrentUser());
  console.log(token);
  /* const token = true; */

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        {/*  <Header /> */}
        <div className="Container">
          {token ? (
            <Grid container spacing={2}>
              <Routes>
                <Route path="*" element={ <Navigate to="/create" />} />
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
              <Route path="*" element={ <Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </Grid>
          )}
        </div>
        <Navbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
