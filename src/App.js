import "./styles/App.css";

import Home from "./components/Home";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import Login from "./components/dashboard/login/Login"
import Signup from "./components/dashboard/login/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "./services/authService";
import { Token } from "@mui/icons-material";

function App() {

  const [token] = useState(AuthService.getCurrentUser());
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={token ? <Home />: <Login />} />
          <Route path="/register" element={token ? <Home />:<Signup />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
