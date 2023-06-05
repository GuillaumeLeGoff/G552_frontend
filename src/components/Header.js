import { AppBar, Toolbar } from '@mui/material';
import React from 'react';

function Header() {
  return (
    <AppBar
      style={{
        justifyContent: "center",
        position: "sticky",
        top: "0",
        marginBottom: "2vh",
      }}
    >
      <Toolbar
        style={{
          justifyContent: "center",
          padding: "0",
        }}
      >
        <img
          src="/images/Logo_Stramatel.png"
          alt="Logo"
          style={{ width: "200px", height: "auto" }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
