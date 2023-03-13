import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleCancel = () => {
    setIsEditMode(false);
    // reset the user information here
  };

  const handlePasswordChange = () => {
    // change the user's password here
  };

  return (
    <Grid item xs={12}>
      <Paper>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ ml: 2 }}>
              <AccountBoxIcon sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" color="white" sx={{ padding: 2 }}>
              Profile
            </Typography>
          </div>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "calc(94vh - 120px)",
            overflowY: "scroll",
          }}
          p={1}
        >
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2">
              Sport: {username}
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom>
              Change Password:
            </Typography>
            <TextField
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              label="Current Password"
            />
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="New Password"
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handlePasswordChange}>
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Profile;
