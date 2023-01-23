import "./styles/App.css";

import Home from "./components/Home";
import Event from "./components/dashboard/create/Event";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import Login from "./components/dashboard/login/Login";
import Signup from "./components/dashboard/login/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthService from "./services/authService";
import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme.ts";




function App() {
  const [token] = useState(AuthService.getCurrentUser());
  return (
    <ThemeProvider theme={appTheme}>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container maxWidth={false}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/create" element={token ? <Event /> : <Login />} />
            <Route path="/login" element={token ? <Home /> : <Login />} />
            <Route path="/register" element={token ? <Home /> : <Signup />} />
          </Routes>
        </Container>
        <Navbar />
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
