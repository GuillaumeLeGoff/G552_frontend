import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import PermMediaIcon from "@mui/icons-material/PermMedia";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/authService";

function NavBar() {
  const [token] = useState(AuthService.getCurrentUser());
  function logout() {
    console.log("test");
    AuthService.logout();
  }

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: "1000",
      }}
    >
      <BottomNavigation style={{ backgroundColor: "#203038" }}>
        {token ? (
          <div>
            <BottomNavigationAction
              component={Link}
              to="/signal"
              label="Évenements"
              icon={<PermMediaIcon sx={{ color: "white" }} />}
            />

            <BottomNavigationAction
              component={Link}
              to="/signal"
              label="Macro"
              icon={<KeyboardIcon sx={{ color: "white" }} />}
            />

            <BottomNavigationAction
              component={Link}
              to="/signal"
              label="Controller"
              icon={<ScreenshotMonitorIcon sx={{ color: "white" }} />}
            />

            <BottomNavigationAction
              component={Link}
              to="/signal"
              label="Profil"
              icon={<AccountCircleIcon sx={{ color: "white" }} />}
            />

            <BottomNavigationAction
              component={Link}
              to="/signal"
              onClick={() => logout()}
              label="Déconnexion"
              icon={<LogoutIcon sx={{ color: "white" }} />}
            />
          </div>
        ) : (
          <div>
            <Link to={"/login"}>
              <BottomNavigationAction
                label="Profil"
                icon={<LoginIcon sx={{ color: "white" }} />}
              />
            </Link>
            <Link to={"/register"}>
              <BottomNavigationAction
                label="Créer un compte"
                icon={<PersonAddAltIcon sx={{ color: "white" }} />}
              />
            </Link>
          </div>
        )}
      </BottomNavigation>
    </Paper>
  );
}

export default NavBar;
