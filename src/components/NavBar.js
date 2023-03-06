import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import KeyboardIcon from "@mui/icons-material/Keyboard";

import { useMediaQuery } from "@mui/material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthService from "../services/authService";

function NavBar() {
  const [token] = useState(AuthService.getCurrentUser());
   /* const token = true; */
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  function handleLogoutDialogOpen() {
    setLogoutDialogOpen(true);
  }

  function handleLogoutDialogClose() {
    setLogoutDialogOpen(false);
  }

  function logout() {
    AuthService.logout();
  }

  function getIconColor(path) {
    return location.pathname.startsWith(path) ? "secondary" : "white";
  }

  return (
    <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
      {token ? (
        <BottomNavigation value={location.pathname}>
          <BottomNavigationAction
            component={Link}
            to="/create"
            label="Évenements"
            icon={<PermMediaIcon sx={{ color: getIconColor("/create") }} />}
          />

          <BottomNavigationAction
            component={Link}
            to="/macro"
            label="Macro"
            icon={<KeyboardIcon sx={{ color: getIconColor("/macro") }} />}
          />

          <BottomNavigationAction
            component={Link}
            to="/profile"
            label="Profile"
            icon={
              <AccountCircleIcon sx={{ color: getIconColor("/profile") }} />
            }
          />

          <BottomNavigationAction
            onClick={handleLogoutDialogOpen}
            label="Déconnexion"
            icon={<LogoutIcon sx={{ color: getIconColor("/login") }} />}
          />
        </BottomNavigation>
      ) : (
        ""
      )}

      <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
        <DialogTitle>{"Déconnexion"}</DialogTitle>
        <DialogContent>
          <div>Voulez-vous vraiment vous déconnecter ?</div>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={handleLogoutDialogClose}>
            Annuler
          </Button>
          <Button sx={{ color: "white" }} onClick={logout}>
            Déconnexion
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default NavBar;
