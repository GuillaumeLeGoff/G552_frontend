import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import React from 'react'

function Header() {
    
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar className='AppBar'
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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          style={{ padding: "0", justifyContent: "center" }}
        >

        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header